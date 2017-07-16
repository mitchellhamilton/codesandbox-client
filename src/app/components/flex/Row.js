import styled from 'emotion/react';

export default styled.div`
  display: flex;
  flex-direction: row;

  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems || 'center'};
`;
