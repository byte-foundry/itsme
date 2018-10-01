import React from 'react';
import styled from 'react-emotion';

import Login from './Login';
import SelectFont from './SelectFont';
import SelectVariant from './SelectVariant';
import Confirm from './Confirm';

import {runFunctionInPageContext} from './App';

import { buttonDefault } from '../defaultStyles';
import { colors } from '../variables';
import ChooseFontOrigin from './ChooseFontOrigin';

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
  overflow-y: auto;
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
  constructor(props) {
    super();

    this.state = {
      currentStep: 'selectFontOrigin',
      fontList: [],
      showBanner: props.showBanner,
      selectedFont: (props.selectedFamily && props.selectedFamily.name) || null,
      selectedVariant: null,
    };
  }

  handleSelectFont = font => {
    this.setState({ selectedFont: font });
  };

  storeSelectedFont = () => {
    this.props.storeFamily(this.state.selectedFont, this.state.showBanner);
  };

  componentDidMount() {
    runFunctionInPageContext(function () {
      ga('itsMe.send', 'event', 'User', 'OpenedModal', '');
    });
  }

  render() {
    const { email, needLogin, fontList, onLogin, close } = this.props;
    const {
      currentStep,
      selectedFont,
      selectedVariant,
    } = this.state;

    // get categories
    const categories = [...new Set(fontList.map(item => item.category))];
    categories.unshift('all');

    return (
      <React.Fragment>
        <Mask onClick={close} />
        <Popout>
          <CloseButton onClick={close} />
          <Title>It's Me</Title>
          <SubTitle>Attach your identity to your emails.</SubTitle>
          {/* Steps */}
          {needLogin && (
            <Login
              email={email}
              onLogin={(data) => {
                console.log('Modal received login infos', data);
                onLogin(data);
                this.setState({ currentStep: 'selectFontOrigin' });
              }}
            />
          )}

          {!needLogin &&
            currentStep === 'selectFontOrigin' && (
              <ChooseFontOrigin
                onChoose={fontType =>
                  this.setState({ currentStep: 'selectFont' })
                }
              />
            )}

          {!needLogin &&
            currentStep === 'selectFont' && (
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
                        currentStep: 'confirm',
                      })
                    }
                  >
                    Next
                  </ActionButton>
                </div>
              </React.Fragment>
            )}

          {/* drafted idea: when choosing a family, select which bold, italic, regular to use */}
          {/* {!needLogin && currentStep === 'selectVariant' && (
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

          {!needLogin &&
            currentStep === 'confirm' && (
              <React.Fragment>
                <Confirm
                  showBanner={this.state.showBanner}
                  onChoose={() =>
                    this.setState({ showBanner: !this.state.showBanner })
                  }
                />
                <div>
                  <ActionButton
                    disabled={false}
                    onClick={() => {
                      this.storeSelectedFont();
                      close();
                    }}
                  >
                    Start using my font now
                  </ActionButton>
                </div>
              </React.Fragment>
            )}
        </Popout>
      </React.Fragment>
    );
  }
}
