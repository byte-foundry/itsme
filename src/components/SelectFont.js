import React from 'react';
import styled from 'react-emotion';

const FontSelect = styled('div')`
  overflow-y: scroll;
`;

/* font-family: "${({ name }) => name}", "comic sans"; */
const FontOption = styled('div')`
  background: ${({ selected }) => (selected ? '#4444aa' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : 'inherit')};
  margin: 5px;
  padding: 10px;
  border-radius: 5px;

  :hover {
    background: #66abff;
    color: white;
  }
`;

const SelectFont = ({ fonts = [], selected, onSelectFont }) => (
  <React.Fragment>
    <p>Select your font</p>
    <FontSelect>
      {fonts.map((font, i) => (
        <FontOption name={font} selected={font === selected} onClick={() => onSelectFont(font)}>
          {font}
        </FontOption>
      ))}
    </FontSelect>
  </React.Fragment>
);

export default SelectFont;
