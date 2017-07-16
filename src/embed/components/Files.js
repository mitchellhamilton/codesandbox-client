// @flow
import React from 'react';
import styled from 'emotion/react';
import { sortBy } from 'lodash';

import type { Module, Directory } from 'common/types';

import File from './File';

const Container = styled.div`
  line-height: 1;
`;

type Props = {
  modules: Array<Module>,
  directories: Array<Directory>,
  directoryId: string,
  depth: number,
  currentModule: string,
  setCurrentModule: (id: string) => any,
};

const Files = ({
  modules,
  directories,
  directoryId,
  depth = 0,
  currentModule,
  setCurrentModule,
}: Props) => {
  const childrenModules = modules.filter(
    m => m.directoryShortid === directoryId,
  );

  const childrenDirectories = directories.filter(
    d => d.directoryShortid === directoryId,
  );

  return (
    <Container>
      {sortBy(childrenDirectories, d => d.title).map(d => (
        <div key={d.shortid}>
          <File
            id={d.shortid}
            title={d.title}
            type="directory"
            depth={depth}
            setCurrentModule={setCurrentModule}
          />
          <Files
            modules={modules}
            directories={directories}
            directoryId={d.shortid}
            depth={depth + 1}
            setCurrentModule={setCurrentModule}
            currentModule={currentModule}
          />
        </div>
      ))}
      {sortBy(childrenModules, m => m.title).map(m => (
        <File
          id={m.shortid}
          title={m.title}
          key={m.shortid}
          type="module"
          depth={depth}
          setCurrentModule={setCurrentModule}
          active={m.shortid === currentModule}
          alternative={m.title === 'index.js' && m.directoryShortid == null}
        />
      ))}
    </Container>
  );
};

export default Files;
