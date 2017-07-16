import React from 'react';
import styled from 'emotion/react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import type { Module, Directory, Sandbox } from 'common/types';

import Preview from 'app/components/sandbox/Preview';
import delayEffect from 'app/utils/animation/delay-effect';
import {
  modulesFromSandboxSelector,
  findMainModule,
} from 'app/store/entities/sandboxes/modules/selectors';
import sandboxActionCreators from 'app/store/entities/sandboxes/actions';

import { directoriesFromSandboxSelector } from 'app/store/entities/sandboxes/directories/selectors';
import { preferencesSelector } from '../../../store/preferences/selectors';

const Container = styled.div`
  composes: ${delayEffect(0.4)}
  position: relative;
  height: 500px;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);

  iframe {
    height: calc(100% - 3rem);
  }
`;

type Props = {
  sandbox: Sandbox,
  modules: Array<Module>,
  directories: Array<Directory>,
  sandboxActions: typeof sandboxActionCreators,
  preferences: Object,
};

const mapDispatchToProps = dispatch => ({
  sandboxActions: bindActionCreators(sandboxActionCreators, dispatch),
});
const mapStateToProps = (state, props) => ({
  modules: modulesFromSandboxSelector(state, props),
  directories: directoriesFromSandboxSelector(state, props),
  preferences: preferencesSelector(state),
});
class ShowcasePreview extends React.PureComponent {
  props: Props;

  fetchBundle = () => {
    const { sandbox, sandboxActions } = this.props;
    sandboxActions.fetchDependenciesBundle(sandbox.id);
  };

  render() {
    const {
      sandbox,
      modules,
      sandboxActions,
      preferences,
      directories,
    } = this.props;

    const mainModule = findMainModule(modules);

    return (
      <Container>
        <Preview
          sandboxId={sandbox.id}
          isInProjectView
          modules={modules}
          directories={directories}
          bundle={sandbox.dependencyBundle}
          externalResources={sandbox.externalResources}
          module={mainModule}
          fetchBundle={this.fetchBundle}
          addError={sandboxActions.addError}
          errors={sandbox.errors}
          clearErrors={sandboxActions.clearErrors}
          preferences={preferences}
          noDelay
        />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowcasePreview);
