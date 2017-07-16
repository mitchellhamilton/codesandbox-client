import styled from 'emotion/react';
import delayEffect from '../../utils/animation/delay-effect';

export default styled.div`
  composes: ${props => delayEffect(props.delay || 0)}
`;
