import styled, { css } from 'emotion/react';

import theme from 'common/theme';

export const getContainerStyles = props => {
  const color = props.alternative ? theme.primary : theme.secondary;
  let styles = css`
    composes: ${props.active || props.editing ? '' : css`
    &:hover {
      background-color: ${color.clearer(0.9)()};
      color: ${theme.background.lighten(5)()};
      border-color: ${color.darken(0.4)()};
    }
      `}} ${() => {}}
    transition: 0.3s ease all;
    position: relative;
    display: flex;
    font-size: 14px;
    padding: 0.6rem;
    padding-left: ${props.depth != null ? `${props.depth + 1.5}rem` : 'calc(1rem - 2px)'};
    color: ${theme.background.lighten(2)()};
    text-decoration: none;
    font-weight: 400;
    min-width: 100px;
    border-left: 2px solid transparent;
    cursor: pointer;
    user-select: none;

    &:hover {
      > div {
        opacity: 1; !important
      }
    }
  `;

  if (props.editing) {
    styles += ` ${css`
      color: ${theme.white()};
      background-color: ${color.clearer(0.9)()};
    `}`;

    if (props.nameValidationError) {
      styles += ` ${css`
        border-color: ${theme.red()} !important;
        background-color: ${theme.redBackground.clearer(0.4)()} !important;
      `}`;
    }
  }

  if (props.active) {
    styles += ` ${css`
      color: ${theme.white()} !important;
      border-color: ${color()} !important;
      background-color: ${color.lighten(0.1).clearer(0.8)()} !important;
    `}`;
  }

  return styles;
};

export default styled.span`
  composes: ${props => getContainerStyles(props)}
`;
