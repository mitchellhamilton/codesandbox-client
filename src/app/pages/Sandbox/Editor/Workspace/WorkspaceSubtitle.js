import styled from 'emotion/react';

export default styled.h4`
  font-size: .875rem;
  margin: 0.5rem 0;
  font-weight: 400;
  color: ${props => props.theme.background3.lighten(0.5)};
  padding: 0 1rem;
`;
