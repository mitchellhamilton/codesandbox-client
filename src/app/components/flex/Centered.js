import styled, { css } from 'emotion/react';

export default styled.div`
  composes: ${props => props.horizontal && css`justify-content: center;`} ${props => props.vertical && `align-items: center;`};
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
