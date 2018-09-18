import React from 'react';
import styled from 'react-emotion';

import { textDefault, buttonDefault } from '../defaultStyles';
import { colors } from '../variables';
import placeholderImage from '../../images/placeholder.png';

const Text = styled('p')`
  ${textDefault};
`;

const Img = styled('img')`
  width: 100%;
  height: auto;
`;

const ActionButton = styled('button')`
  ${buttonDefault}
  border: 2px solid ${colors.backgroundPrimaryLight};
  border-radius: 5px;
  display: block;
  width: 100%;
  color: ${colors.textPrimary};
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  
  font-size: 18px;

  svg {
    transform: translateY(1px);
    margin-right: 10px;
  }

  &:hover {
    background: ${colors.backgroundPrimary};
    color: ${colors.background};
    svg {
      path {
        fill: ${colors.background};
      }
    }
  }
`;

const Login = ({ onLogin }) => (
  <div>
    <Img
      src={chrome.runtime.getURL(placeholderImage)}
      alt="placeholder image"
    />
    <Text>Choose a way to personnalise your emails:</Text>
    <ActionButton
      onClick={() => onLogin({ email: 'test@test.fr', token: 'whatever' })}
    >
      <svg width="14" height="14.288">
        <path
          fill="#6558F5"
          d="M7.144 6.12h6.744Q14 6.745 14 7.313q0 2.018-.847 3.604-.846 1.586-2.413 2.48-1.568.892-3.596.892-1.46 0-2.781-.562-1.321-.563-2.28-1.521-.957-.958-1.52-2.28Q0 8.606 0 7.146q0-1.461.563-2.782t1.52-2.28q.959-.957 2.28-1.52Q5.683 0 7.144 0q2.79 0 4.79 1.87L9.992 3.74Q8.847 2.633 7.144 2.633q-1.2 0-2.218.604-1.019.605-1.614 1.642-.596 1.037-.596 2.265 0 1.228.596 2.265.595 1.038 1.614 1.642 1.018.605 2.218.605.81 0 1.489-.223.679-.224 1.116-.559.437-.334.763-.762.325-.428.479-.81.153-.381.209-.725H7.144z"
        />
      </svg>
      Google Fonts
    </ActionButton>
  </div>
);

export default Login;
