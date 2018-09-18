import React from 'react';
import styled from 'react-emotion';

import Login from './Login';
import SelectFont from './SelectFont';

import {buttonDefault} from '../defaultStyles';
import {colors} from '../variables';


const Mask = styled('div')`
  position: absolute;
  background: rgba(41, 56, 69, 0.6);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000000;
`;


const Popout = styled('div')`
  position: absolute;
  top: 0;
  width: 350px;
  bottom: 0;
  background: #fff;
  z-index: 10000001;
  margin: auto;
  right: 0;
  padding: 45px 35px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.backgroundSecondary};
`;

const CloseButton = styled('button')`
  composes: ${buttonDefault};
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;

  &::before, &::after {
    content: '';
    position: absolute;
    height: 5px;
    width: 20px;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: ${colors.important};
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

const Title = styled('h1')`
  color: ${colors.text};
  margin-bottom: 5px;
  margin-top: 5px;
`

const SubTitle = styled('h3')`
  color: ${colors.textSecondary};
  font-style: italic;
  margin-top: 5px;
  font-weight: normal;
`

export default class Modal extends React.Component {
  constructor() {
    super();

    this.state = {
      currentStep: 'login',
      fontList: [],
      selectedFont: null,
    };
  }

  async componentWillMount() {
    const fontListResponse = await fetch(
      'https://www.googleapis.com/webfonts/v1/webfonts?fields=items%2Ffamily&key=AIzaSyAMYKtd8F3neG_z4FnkjhW1R6p24njPKLI'
    );

    const fontList = await fontListResponse.json();

    this.setState({ fontList: fontList.items.map(font => font.family) });
  }

  handleSelectFont = (font) => {
    this.setState({ selectedFont: font });

    // TODO: update font on the server
  }

  render() {
    const { close } = this.props;
    const { currentStep, fontList, selectedFont } = this.state;

    return (
      <React.Fragment>
        <Mask onClick={close} />
        <Popout>
            <CloseButton onClick={close}/>
            <Title>It's Me</Title>
            <SubTitle>Attach your identity to your emails.</SubTitle>
          {/* Steps */}
          {currentStep === 'login' && (
            <Login
              onLogin={() => this.setState({ currentStep: 'selectFont' })}
            />
          )}

          {currentStep === 'selectFont' && (
            <React.Fragment>
              <SelectFont
                fonts={fontList}
                onSelectFont={this.handleSelectFont}
                selected={selectedFont}
              />
              <div>
                <button disabled={!selectedFont} onClick={() => this.setState({currentStep: 'confirm'})}>Next</button>
              </div>
            </React.Fragment>
          )}

          {currentStep === 'confirm' && (
            <p>Good, now go use it!</p>
          )}
        </Popout>
      </React.Fragment>
    );
  }
}
