import styled from 'emotion/react';
import fadeIn from 'app/utils/animation/fade-in';

export const Icon = styled.div`
  position: relative;
  display: inline-block;
  transition: 0.3s ease color;
  color: ${props => props.theme.background2.lighten(3)};
  padding-left: 0.25rem;
  &:hover {
    color: white;
  }
`;

export const IconArea = styled.div`
  composes: ${fadeIn(0)};  
  position: absolute;
  right: 1rem;
  opacity: 0;
  line-height: 1;
`;
