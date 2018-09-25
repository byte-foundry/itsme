import React from 'react';
import styled from 'react-emotion';

import { textDefault, buttonDefault } from '../defaultStyles';
import { colors } from '../variables';

import client, { gql } from '../graphqlClient';

const Text = styled('p')`
  ${textDefault};
`;

const ActionButton = styled('button')`
  ${buttonDefault}
  border: 2px solid ${({ disabled }) =>
    disabled ? colors.disabled : colors.backgroundPrimaryLight};
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
      fill: ${({ disabled }) =>
        disabled ? colors.disabled : colors.textPrimary};
    }
  }

  &:hover {
    background: ${({ disabled }) =>
      disabled ? colors.background : colors.backgroundPrimary};
    color: ${({ disabled }) =>
      disabled ? colors.disabled : colors.background};
    svg {
      path {
        fill: ${({ disabled }) =>
          disabled ? colors.disabled : colors.background};
      }
    }
  }
`;

class Login extends React.Component {
  componentDidMount() {
    this.authenticate();
  }

  authenticate = interactive => {
    const { email, onLogin } = this.props;

    this.setState({ loading: true });

    chrome.runtime.sendMessage(
      { type: 'getGoogleToken', email, interactive },
      async googleToken => {
        if (!googleToken) {
          console.log('Error when getting token');
          this.setState({ loading: false });
          return;
        }

        try {
          const {
            authenticateGoogleUser: { id, token },
          } = await client.request(
            gql`
              mutation authenticate($token: String!) {
                authenticateGoogleUser(googleToken: $token) {
                  id
                  token
                }
              }
            `,
            { token: googleToken }
          );

          this.setState({ loading: false });
          try {
            ga('send', 'event', 'User', 'Registered', '');
          } catch (e) {}
          onLogin({ id, token });
        } catch (err) {
          console.error(err);
          this.setState({ id: null, loading: false });
        }
      }
    );
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <Text>Let's first connect your Google account to It's me.</Text>
        {loading ? (
          <Text>Authenticating...</Text>
        ) : (
          <ActionButton onClick={() => this.authenticate(true)}>Authorize</ActionButton>
        )}
      </div>
    );
  }
}

export default Login;
