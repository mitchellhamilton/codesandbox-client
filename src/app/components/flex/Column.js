import styled from 'emotion/react';

export default styled.div`
  display: flex;
  flex-direction: column;

  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
`;
