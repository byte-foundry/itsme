import {css} from 'react-emotion';

import {colors} from './variables';

export const buttonDefault = css`
  z-index: 1;
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  /* Normalize line-height. Cannot be changed from normal in Firefox 4+. */
  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  /* Corrects inability to style clickable input types in iOS */
  -webkit-appearance: none;


  /* Personnal styles */
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const textDefault = css`
  color: ${colors.textSecondary};
`;