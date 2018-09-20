import React from 'react';
import styled from 'react-emotion';

import { textDefault } from '../defaultStyles';
import { colors } from '../variables';

import placeholderImage from '../../images/placeholder.png';


const Title = styled('h1')`
  color: ${colors.textPrimary};
  margin-bottom: 20px;
  margin-top: 20px;
  font-weight: normal;
`;

const Subtitle = styled('h3')`
  color: ${colors.textPrimary};
  margin-bottom: 10px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 16px;
`;


const Text = styled('p')`
  ${textDefault};
  color: ${colors.text};
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 18px;
`;

const Img = styled('img')`
  width: 100%;
  height: auto;
  margin-bottom: 30px;
`;

const CustomCheckbox = styled('span')`
  width: 55px;
	height: 30px;
	overflow: hidden;
	border-radius: 20px;
  display: inline-block;
  transform: translateY(8px);
  margin-right: 10px;
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  label {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    background-color: #DDDDDD;
    transition: background-color .3s;
    label {
      top: 4px;
      left: 7px;
      width: 22px;
      height: 22px;
      display: block;
      position: absolute;
      border-radius: 100%;
      transition: left .3s;
      background-color: white;
      box-shadow: 0px 1px 5px 0px rgba(56,55,56,0.61);
    }
  }
  input:checked + label {
    background-color: ${colors.success};
  }
  input:checked + label label {
    left: 29px;
  }
  input {
    display: none;
  }
`;

const Option = styled('span')`
  font-size: 19px;
`;

const Confirm = () => {
  return (
    <React.Fragment>
      <Title>Almost done!</Title>
      <Text>In order to allow your contacts to see your bespoke font, we need them to install it's me.</Text>
      {/* <Subtitle>How do you want to notify them?</Subtitle> */}
      <Subtitle>How will they be notified?</Subtitle>
      {/* <p style={{marginTop: '10px', marginBottom: '30px'}}>
        <CustomCheckbox disabled>
          <input type="checkbox" id="custom-checkbox" checked disabled/>
          <label htmlFor="custom-checkbox">
            <label htmlFor="custom-checkbox"/>
          </label>
        </CustomCheckbox>
        <Option>Add a small banner in my emails</Option>
      </p> */}
      <Text>We will add a small text banner at the top of your emails for those without the extension.</Text>
      <Text>It should look like this:</Text>
      <Img
        src={chrome.runtime.getURL(placeholderImage)}
        alt="placeholder image"
      />
    </React.Fragment>
  );
};

export default Confirm;
