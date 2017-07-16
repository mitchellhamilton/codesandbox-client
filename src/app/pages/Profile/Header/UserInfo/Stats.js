import React from 'react';
import styled from 'emotion/react';

import Stat from 'app/components/Stat';
import delayEffect from '../../../../utils/animation/delay-effect';

const Container = styled.div`
  composes: ${delayEffect(0.1)};
  float: right;
  flex: 1;
  display: flex;
  height: 100%;

  justify-content: center;
  align-items: top;
  margin-bottom: 4rem;
  max-width: 450px;
  font-size: 1.25rem;
`;

type Props = {
  viewCount: number,
  likeCount: number,
  forkCount: number,
};

export default ({ viewCount, likeCount, forkCount }: Props) =>
  <Container>
    <Stat name="Likes" count={likeCount} />
    <Stat name="Views" count={viewCount} />
    <Stat name="Forked" count={forkCount} />
  </Container>;
