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
  background: ${({ selected }) => (selected ? colors.backgroundPrimary : 'transparent')};
  color: ${({ selected }) => (selected ? colors.background : colors.textSecondary)};
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

const SelectVariant = ({ selected, onSelectVariant, selectedFamily }) => {
  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => ( 
    <FontOption
      key={key}
      name={list[rowIndex][columnIndex]} selected={selected && (list[rowIndex][columnIndex] === selected)}
      onClick={() => onSelectVariant(list[rowIndex][columnIndex])}
      style={{
        ...style,
        fontFamily: `${selectedFamily.family}, sans-serif`,
        fontWeight: list[rowIndex][columnIndex].split('italic')[0],
        fontStyle: list[rowIndex][columnIndex].split('italic').length > 1 ? 'italic' : 'normal',
      }}
    >
      {selectedFamily.family} {list[rowIndex][columnIndex]}
      <style>
        {`@import url("${selectedFamily.files[list[rowIndex][columnIndex]]}");`}
      </style>
    </FontOption>
  );
  const list = selectedFamily.variants.map(v => [v]);
  return list && list[0] ? (
    <React.Fragment>
      <Text>Choose the right variant</Text>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={list[0].length}
        columnWidth={325}
        height={window.innerHeight - 314}
        rowCount={list.length}
        rowHeight={57}
        width={345}
        style={{marginBottom: '20px', outline: 'none'}}
      />
      {/* <FontSelect>
        {fonts.map((font) => (
          <FontOption  style={{fontFamily: font.family}}>
            <style>
              {`@import url("https://fonts.googleapis.com/css?family=${font.family}");`}
            </style>
            {font.family}
          </FontOption>
        ))}
      </FontSelect> */}
    </React.Fragment>
  ) : null;
};

export default SelectVariant;
