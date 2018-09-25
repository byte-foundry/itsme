import React from 'react';
import styled from 'react-emotion';

import { textDefault, buttonDefault } from '../defaultStyles';
import { colors } from '../variables';
import mainImage from '../../images/main.png';

const Text = styled('p')`
  ${textDefault};
`;

const Img = styled('img')`
  width: 100%;
  height: auto;
`;

const DisabledText = styled('p')`
  margin: 0;
  text-align: right;
  color: #aaa;
  font-style: italic;
`;

const ActionButton = styled('button')`
  ${buttonDefault}
  border: 2px solid ${({ disabled }) => (disabled ? colors.disabled : colors.backgroundPrimaryLight)};
  border-radius: 5px;
  display: block;
  width: 100%;
  color: ${({ disabled }) => (disabled ? colors.disabled : colors.textPrimary)};
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};

  svg {
    transform: translateY(1px);
    margin-right: 10px;
    path {
      fill: ${({ disabled }) => (disabled ? colors.disabled : colors.textPrimary)};
    }
  }

  &:hover {
    background: ${({ disabled }) => (disabled ? colors.background : colors.backgroundPrimary)};
    color: ${({ disabled }) => (disabled ? colors.disabled : colors.background)};
    svg {
      path {
        fill: ${({ disabled }) => (disabled ? colors.disabled : colors.background)};
      }
    }
  }
`;

const ChooseFontOrigin = ({ onChoose }) => (
  <div>
    <Img
      src={chrome.runtime.getURL(mainImage)}
      alt="main image"
    />
    <Text>Choose a way to personnalise your emails:</Text>
    <ActionButton
      onClick={() => onChoose('google')}
    >
      <svg width="14" height="14.288">
        <path
          fill="#6558F5"
          d="M7.144 6.12h6.744Q14 6.745 14 7.313q0 2.018-.847 3.604-.846 1.586-2.413 2.48-1.568.892-3.596.892-1.46 0-2.781-.562-1.321-.563-2.28-1.521-.957-.958-1.52-2.28Q0 8.606 0 7.146q0-1.461.563-2.782t1.52-2.28q.959-.957 2.28-1.52Q5.683 0 7.144 0q2.79 0 4.79 1.87L9.992 3.74Q8.847 2.633 7.144 2.633q-1.2 0-2.218.604-1.019.605-1.614 1.642-.596 1.037-.596 2.265 0 1.228.596 2.265.595 1.038 1.614 1.642 1.018.605 2.218.605.81 0 1.489-.223.679-.224 1.116-.559.437-.334.763-.762.325-.428.479-.81.153-.381.209-.725H7.144z"
        />
      </svg>
      Google Fonts
    </ActionButton>
    <ActionButton
      onClick={() => onChoose('custom')}
      disabled
    >
      <svg width="17.28" height="16">
        <path fill="#6558f5" d="M11.52 12.48v1.28H.32a.32.32 0 1 0 0 .64h11.2v1.28a.32.32 0 0 0 .32.32h3.84a.32.32 0 0 0 .32-.32V14.4h.96a.32.32 0 1 0 0-.64H16v-1.28a.32.32 0 0 0-.32-.32h-3.84a.32.32 0 0 0-.32.32zM6.4 6.4v1.28H.32a.32.32 0 1 0 0 .64H6.4V9.6a.32.32 0 0 0 .32.32h3.84a.32.32 0 0 0 .32-.32V8.32h6.08a.32.32 0 1 0 0-.64h-6.08V6.4a.32.32 0 0 0-.32-.32H6.72a.32.32 0 0 0-.32.32zM1.28.32V1.6H.32a.32.32 0 1 0 0 .64h.96v1.28a.32.32 0 0 0 .32.32h3.84a.32.32 0 0 0 .32-.32V2.24h11.2a.32.32 0 1 0 0-.64H5.76V.32A.32.32 0 0 0 5.44 0H1.6a.32.32 0 0 0-.32.32z"/>
      </svg>
      Custom fonts
    </ActionButton>
    <DisabledText>Coming soon!</DisabledText>
  </div>
);

export default ChooseFontOrigin;
