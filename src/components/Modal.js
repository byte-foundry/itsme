import React from 'react';
import styled from 'react-emotion';

import Login from './Login';
import SelectFont from './SelectFont';
import SelectVariant from './SelectVariant';

import { buttonDefault } from '../defaultStyles';
import { colors } from '../variables';

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

  &::before,
  &::after {
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

  &:hover {
    background: ${({ disabled }) =>
      disabled ? colors.background : colors.backgroundPrimary};
    color: ${({ disabled }) =>
      disabled ? colors.disabled : colors.background};
  }
`;

const Title = styled('h1')`
  color: ${colors.text};
  margin-bottom: 5px;
  margin-top: 5px;
`;

const SubTitle = styled('h3')`
  color: ${colors.textSecondary};
  font-style: italic;
  margin-top: 5px;
  font-weight: normal;
`;

export default class Modal extends React.Component {
  constructor() {
    super();

    this.state = {
      currentStep: 'login',
      fontList: [],
      selectedFont: null,
      selectedVariant: null,
    };
  }

  async componentWillMount() {
    const fontListResponse = await fetch(
      'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAMYKtd8F3neG_z4FnkjhW1R6p24njPKLI'
    );
    const fontList = await fontListResponse.json();
    // filter font list :
    // - At least a regular
    // - At least an italic
    // - At least a bold
    const filteredFonts = fontList.items.filter(
      family =>
        family.variants.find(v => v === 'regular') &&
        family.variants.find(v => v.includes('italic')) &&
        family.variants.find(v => parseInt(v.split('italic')[0]) > 500)
    );
    console.log(filteredFonts);
    // get categories
    const categories = [...new Set(filteredFonts.map(item => item.category))];
    categories.unshift('all');
    this.setState({ fontList: filteredFonts, categories });
  }

  handleSelectFont = font => {
    console.log(font);
    this.setState({ selectedFont: font });
    // TODO: update font on the server
  };

  handleSelectVariant = variant => {
    console.log(variant);
    this.setState({ selectedVariant: variant });
    // TODO: update font on the server
  };

  render() {
    const { close } = this.props;
    const {
      currentStep,
      fontList,
      selectedFont,
      selectedVariant,
      categories,
    } = this.state;

    return (
      <React.Fragment>
        <Mask onClick={close} />
        <Popout>
          <CloseButton onClick={close} />
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
                categories={categories}
              />
              <div>
                <ActionButton
                  disabled={!selectedFont}
                  onClick={() =>
                    // this.setState({
                    //   currentStep:
                    //     selectedFont.variants.length > 1
                    //       ? 'selectVariant'
                    //       : 'confirm',
                    // })
                    this.setState({
                      currentStep: 'confirm'
                    })
                  }
                >
                  Next
                </ActionButton>
              </div>
            </React.Fragment>
          )}
          
          {// drafted idea: when choosing a family, select which bold, italic, regular to use}
          {/* {currentStep === 'selectVariant' && (
            <React.Fragment>
              <SelectVariant
                onSelectVariant={this.handleSelectVariant}
                selected={selectedVariant}
                selectedFamily={selectedFont}
              />
              <div>
                <ActionButton
                  disabled={!selectedVariant}
                  onClick={() => this.setState({ currentStep: 'confirm' })}
                >
                  Next
                </ActionButton>
              </div>
            </React.Fragment>
          )} */}

          {currentStep === 'confirm' && <p>Good, now go use it!</p>}
        </Popout>
      </React.Fragment>
    );
  }
}
