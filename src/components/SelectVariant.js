import React from 'react';
import styled from 'react-emotion';
import { Grid } from 'react-virtualized';

import { textDefault } from '../defaultStyles';
import { colors } from '../variables';

const FontSelect = styled('div')`
  overflow-y: scroll;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Text = styled('p')`
  ${textDefault};
  color: ${colors.textPrimary};
`;

const FontOption = styled('div')`
  background: ${({ selected }) =>
    selected ? colors.backgroundPrimary : 'transparent'};
  color: ${({ selected }) =>
    selected ? colors.background : colors.textSecondary};
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 0 20px;
  line-height: 57px;
  cursor: pointer;

  :hover {
    background: ${colors.backgroundPrimaryLight};
    color: ${colors.background};
  }
`;

class SelectVariant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRegular: null,
      selectedItalic: null,
      selectedBold: null,
    };
  }
  render() {
    const { onSelectVariant, selectedFamily } = this.props;
    const { selectedRegular, selectedItalic, selectedBold } = this.state;
    const regularList = selectedFamily.variants.filter(
      v =>
        v.split('italic').length === 1 &&
        (v === 'regular' || parseInt(v.split('italic')[0]) < 600)
    );
    const italicList = selectedFamily.variants.filter(v =>
      v.includes('italic')
    );
    const boldList = selectedFamily.variants.filter(
      v =>
        v.split('italic').length === 1 && parseInt(v.split('italic')[0]) > 500
    );

    const getVariantStyle = variant => ({
      fontFamily: `${selectedFamily.family}, sans-serif`,
      fontWeight: variant.split('italic')[0],
      fontStyle: variant.split('italic').length > 1 ? 'italic' : 'normal',
    });

    return (
      <React.Fragment>
        <Text>Choose your regular, bold and italic</Text>
        <h4>Regular</h4>
        <FontSelect>
          {regularList.map(variant => (
            <FontOption
              key={variant}
              name={variant}
              selected={selectedRegular && variant === selectedRegular}
              onClick={() => this.setState({ selectedRegular: variant })}
              style={getVariantStyle(variant)}
            >
              {selectedFamily.family} {variant}
              <style>
                {`@import url("${selectedFamily.files[variant]}");`}
              </style>
            </FontOption>
          ))}
        </FontSelect>
        <h4>Italic</h4>
        <FontSelect>
          {italicList.map(variant => (
            <FontOption
              key={variant}
              name={variant}
              selected={selectedItalic && variant === selectedItalic}
              onClick={() => this.setState({ selectedItalic: variant })}
              style={getVariantStyle(variant)}
            >
              {selectedFamily.family} {variant}
              <style>
                {`@import url("${selectedFamily.files[variant]}");`}
              </style>
            </FontOption>
          ))}
        </FontSelect>
        <h4>Bold</h4>
        <FontSelect>
          {boldList.map(variant => (
            <FontOption
              key={variant}
              name={variant}
              selected={selectedBold && variant === selectedBold}
              onClick={() => this.setState({ selectedBold: variant })}
              style={getVariantStyle(variant)}
            >
              {selectedFamily.family} {variant}
              <style>
                {`@import url("${selectedFamily.files[variant]}");`}
              </style>
            </FontOption>
          ))}
        </FontSelect>
      </React.Fragment>
    );
  }
}

export default SelectVariant;
