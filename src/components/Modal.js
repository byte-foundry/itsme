import React from 'react';
import styled from 'react-emotion';

import Login from './Login';
import SelectFont from './SelectFont';

const Mask = styled('div')`
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000000;
`;

const Popout = styled('div')`
  position: absolute;
  top: 0;
  width: 500px;
  bottom: 0;
  height: 500px;
  background: #fff;
  z-index: 10000001;
  margin: auto;
  right: 0;
  left: 0;
  box-shadow: 0 0 26px #aaa;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

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
          <div>
            <button onClick={close}>Close</button>
          </div>

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
