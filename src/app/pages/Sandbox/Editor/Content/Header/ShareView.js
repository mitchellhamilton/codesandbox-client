import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'emotion/react';
import ShareIcon from 'react-icons/lib/md/share';
import Files from 'embed/components/Files';
import ModeIcons from 'app/components/sandbox/ModeIcons';
import {
  findMainModule,
  modulesFromSandboxSelector,
} from 'app/store/entities/sandboxes/modules/selectors';
import { directoriesFromSandboxSelector } from 'app/store/entities/sandboxes/directories/selectors';
import {
  optionsToParameterizedUrl,
  protocolAndHost,
  sandboxUrl,
  embedUrl,
} from 'app/utils/url-generator';

import type { Sandbox, Directory, Module } from 'common/types';

import Preference from 'app/components/Preference';
import HoverMenu from './HoverMenu';
import Action from './Action';

const Container = styled.div`
  position: relative;
  z-index: 200;
  height: 100%;
`;

const FilesContainer = styled.div`
  max-height: 300px;
  overflow: auto;
`;

const PaddedPreference = styled(Preference)`
  color: rgba(255, 255, 255, 0.6);
  padding-bottom: 1rem;

  &:last-child {
    padding-bottom: 0;
  }
`;

const ShareOptions = styled.div`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: -250px;
  box-sizing: border-box;
  z-index: 2;
  border-radius: 4px;
  font-size: .875rem;

  color: rgba(255, 255, 255, 0.8);
  padding: 1rem;

  box-shadow: -1px 4px 5px rgba(0, 0, 0, 0.5);
  background-color: ${props => props.theme.background2};

  width: 900px;

  h3 {
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
    font-weight: 400;
  }
`;

const Inputs = styled.div`
  margin-top: 0.5rem;
  input {
    border: none;
    outline: none;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    padding: 0.2rem;
    margin: 0.5rem 0;
    border-radius: 4px;
  }

  textarea {
    border: none;
    outline: none;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    padding: 0.2rem;
    margin: 0.5rem 0;
    height: 100px;
    border-radius: 4px;
  }
`;

const LinkName = styled.div`
  margin: 0.5rem 0;
  font-weight: 400;
  margin-bottom: 0;
`;

const Divider = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 100%;

  color: rgba(255, 255, 255, 0.8);
  margin: 0 .75rem;

  h4 {
    margin: 1rem 0;
    font-weight: 400;
  }
`;

const ButtonContainer = styled.div`margin-top: 0.25rem;`;

const ButtonName = styled.div`
  margin: 0.5rem 0;
  font-weight: 500;
  margin-bottom: 0;
`;

type Props = {
  sandbox: Sandbox,
  modules: Array<Module>,
  directories: Array<Directory>,
  sendMessage: (message: string) => void,
};

const BUTTON_URL = 'https://codesandbox.io/static/img/play-codesandbox.svg';

const mapStateToProps = createSelector(
  modulesFromSandboxSelector,
  directoriesFromSandboxSelector,
  (modules, directories) => ({ modules, directories }),
);
class ShareView extends React.PureComponent {
  props: Props;
  state = {
    showEditor: true,
    showPreview: true,
    defaultModule: null,
    autoResize: false,
    hideNavigation: false,
    fontSize: 14,
  };

  handleChange = e => this.setState({ message: e.target.value });

  handleSend = () => {
    if (this.state.message !== '') {
      this.toggle();
      this.props.sendMessage(this.state.message);
      this.setState({ message: '' });
    }
  };

  setEditorView = () => this.setState({ showEditor: true, showPreview: false });
  setPreviewView = () =>
    this.setState({ showEditor: false, showPreview: true });
  setMixedView = () => this.setState({ showEditor: true, showPreview: true });

  setDefaultModule = id => this.setState({ defaultModule: id });

  getOptionsUrl = () => {
    const {
      defaultModule,
      showEditor,
      showPreview,
      autoResize,
      hideNavigation,
      fontSize,
    } = this.state;

    const options = {};

    if (defaultModule) {
      options.module = defaultModule;
    }

    if (showEditor && !showPreview) {
      options.view = 'editor';
    }
    if (!showEditor && showPreview) {
      options.view = 'preview';
    }

    if (autoResize) {
      options.autoresize = 1;
    }

    if (hideNavigation) {
      options.hidenavigation = 1;
    }

    if (fontSize !== 14) {
      options.fontsize = fontSize;
    }

    return optionsToParameterizedUrl(options);
  };

  getEditorUrl = () => {
    const { sandbox } = this.props;

    return protocolAndHost() + sandboxUrl(sandbox) + this.getOptionsUrl();
  };

  getEmbedUrl = () => {
    const { sandbox } = this.props;

    return protocolAndHost() + embedUrl(sandbox) + this.getOptionsUrl();
  };

  getIframeScript = () =>
    `<iframe src="${this.getEmbedUrl()}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`;

  select = function(event) {
    event.target.select();
  };

  // eslint-disable-next-line
  getButtonMarkdown = () => {
    const { sandbox } = this.props;
    return `[![Edit ${sandbox.title ||
      sandbox.id}](${BUTTON_URL})](${this.getEditorUrl()})`;
  };

  // eslint-disable-next-line
  getButtonHTML = () => {
    const { sandbox } = this.props;
    return `<a href="${this.getEditorUrl()}">
  <img alt="Edit ${sandbox.title || sandbox.id}" src="${BUTTON_URL}">
</a>
`;
  };

  setAutoResize = (autoResize: boolean) => {
    this.setState({ autoResize });
  };

  setHideNavigation = (hideNavigation: boolean) => {
    this.setState({ hideNavigation });
  };

  setFontSize = (fontSize: number) => [this.setState({ fontSize })];

  render() {
    const { sandbox, modules, directories } = this.props;
    const {
      showEditor,
      showPreview,
      autoResize,
      hideNavigation,
      fontSize,
    } = this.state;

    const defaultModule =
      this.state.defaultModule || findMainModule(modules).id;

    return (
      <Container>
        <HoverMenu
          HeaderComponent={Action}
          headerProps={{
            title: 'Share',
            Icon: ShareIcon,
            moreInfo: true,
          }}
        >
          {() =>
            <ShareOptions>
              <h3>Share options</h3>
              <Divider>
                <Column>
                  <ButtonName>URL Options</ButtonName>
                  <div>
                    <h4>Embed specific options</h4>
                    <PaddedPreference
                      title="Auto resize"
                      tooltip="Works only on Medium"
                      value={autoResize}
                      setValue={this.setAutoResize}
                    />
                    <PaddedPreference
                      title="Hide navigation bar"
                      value={hideNavigation}
                      setValue={this.setHideNavigation}
                    />
                    <PaddedPreference
                      title="Font size"
                      value={fontSize}
                      setValue={this.setFontSize}
                    />
                  </div>
                  <div>
                    <h4>Default view</h4>
                    <div
                      style={{
                        position: 'relative',
                        height: '2rem',
                        width: '200px',
                        marginLeft: '-10px',
                      }}
                    >
                      <ModeIcons
                        showEditor={showEditor}
                        showPreview={showPreview}
                        setEditorView={this.setEditorView}
                        setPreviewView={this.setPreviewView}
                        setMixedView={this.setMixedView}
                      />
                    </div>
                  </div>
                  <div>
                    <h4>Default module to show and preview</h4>

                    <FilesContainer>
                      <Files
                        modules={modules}
                        directories={directories}
                        directoryId={null}
                        currentModule={defaultModule}
                        setCurrentModule={this.setDefaultModule}
                      />
                    </FilesContainer>
                  </div>
                </Column>
                <Column>
                  <ButtonName>Links</ButtonName>
                  <Inputs>
                    <LinkName>Editor url</LinkName>
                    <input onFocus={this.select} value={this.getEditorUrl()} />
                    <LinkName>Fullscreen url</LinkName>
                    <input onFocus={this.select} value={this.getEmbedUrl()} />
                    <LinkName>Embed url (Medium/Embedly)</LinkName>
                    <input onFocus={this.select} value={this.getEditorUrl()} />
                    <LinkName>iframe</LinkName>
                    <textarea
                      onFocus={this.select}
                      value={this.getIframeScript()}
                    />
                  </Inputs>
                </Column>
                <Column>
                  <ButtonName>Button</ButtonName>
                  <Inputs>
                    <ButtonContainer>
                      <a href={sandboxUrl(sandbox)}>
                        <img
                          alt={sandbox.title || 'Untitled'}
                          src={BUTTON_URL}
                        />
                      </a>
                    </ButtonContainer>
                    <LinkName>Markdown</LinkName>
                    <textarea
                      onFocus={this.select}
                      value={this.getButtonMarkdown()}
                    />

                    <LinkName>HTML</LinkName>
                    <textarea
                      onFocus={this.select}
                      value={this.getButtonHTML()}
                    />
                  </Inputs>
                </Column>
              </Divider>
            </ShareOptions>}
        </HoverMenu>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(ShareView);
