import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'emotion/react';

import theme from 'common/theme';

const getBackgroundColor = ({ disabled, red }) => {
  if (disabled) return css`background: ${theme.background2.darken(0.1)()}`;
  if (red)
    return css`background-image: linear-gradient(270deg, #F27777, #400000);`;
  return css`background-image: linear-gradient(270deg, #fed29d, #A58B66, #7abae8, #56a0d6);`;
};

const getColor = ({ disabled }) => {
  if (disabled) return theme.background2.lighten(1.5)();
  return 'white';
};

const forward = keyframes`
  0%{background-position:0% 50%}
  100%{background-position:100% 50%}
`;

const backward = keyframes`
  0%{background-position:100% 0%}
  100%{background-position:0% 50%}
`;

const hoverStyles = props =>
!props.disabled &&
css`
cursor: pointer;
&:hover {
animation-name: ${forward};
animation-duration: 300ms;
animation-timing-function: ease;
animation-direction: normal;
animation-fill-mode: forwards;

box-shadow: 0 7px 10px rgba(0, 0, 0, 0.5);
transform: translateY(-1px);
}

&:active {
transform: translateY(1px);
box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
}`

const boxShadowStyles =  props => !props.disabled ? '' : css`box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);` 

const smallStyles = props => {
  if (props.small) {
    return css`
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    `;
  }
  return css`padding: 0.65rem 2.25rem;`;
}

const styles = props => css`
  composes: ${getBackgroundColor(props)} ${boxShadowStyles(props)} ${smallStyles(props)};  
  transition: 0.3s ease all;
  animation-name: ${backward};
  animation-duration: 300ms;
  animation-timing-function: ease;

  border: none;
  outline: none;
  background-size: 720%;

  border-radius: 4px;

  box-sizing: border-box;
  font-size: 1.125rem;
  text-align: center;
  color: ${getColor(props)};
  font-weight: 300;
  width: ${props.block ? '100%' : 'inherit'};

  user-select: none;
  text-decoration: none;

`;
const LinkButton = styled(Link)`composes: ${styles}`;
const AButton = styled.a`composes: ${styles};`;
const Button = styled.button`composes: ${styles};`;

type Props = {
  [key: any]: any,
  to: ?string,
  href: ?string,
};

export default (props: Props) => {
  // Link
  if (props.to) {
    return <LinkButton {...props} />;
  }

  if (props.href) {
    return <AButton {...props} />;
  }

  return <Button {...props} />;
};
