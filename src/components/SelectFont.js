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

const Filters = styled('div')`
  ::after {
    content: '';
    display: table;
    clear: both;
  }
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Filter = styled('span')`
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  border: 1px solid ${colors.backgroundPrimary};
  cursor: pointer;
  transition: all .2s ease;
  background: ${({ active }) =>
    active ? colors.backgroundPrimary : 'transparent'};
  color: ${({ active }) =>
    active ? colors.background : colors.textPrimary};
  :hover {
    background: ${colors.backgroundPrimaryLight};
    color: ${colors.background};
  }
`;

class SelectFont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      list: this.props.fonts.map(f => [f.family]),
    };
  }
  filterList = category => {
    const newList =
      category === 'all'
        ? this.props.fonts.map(f => [f.family])
        : this.props.fonts
            .filter(f => f.category === category)
            .map(f => [f.family]);
    this.setState({ filter: category, list: newList });
  };
  render() {
    const { fonts = [], selected, onSelectFont } = this.props;
    const { list } = this.state;
    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => (
      <FontOption
        key={key}
        name={list[rowIndex][columnIndex]}
        selected={selected && list[rowIndex][columnIndex] === selected.family}
        onClick={() =>
          onSelectFont(
            fonts.find(f => f.family === list[rowIndex][columnIndex])
          )
        }
        style={{
          ...style,
          fontFamily: `${list[rowIndex][columnIndex]}, sans-serif`,
        }}
      >
        {list[rowIndex][columnIndex]}
        <style>
          {`@import url("https://fonts.googleapis.com/css?family=${
            list[rowIndex][columnIndex]
          }");`}
        </style>
      </FontOption>
    );
    return this.state.list && this.state.list[0] ? (
      <React.Fragment>
        <Text>Select your font</Text>
        <Filters>
          {this.props.categories.map(category => (
            <Filter
              onClick={() => {
                this.filterList(category);
              }}
              active={this.state.filter === category}
            >
              {category}
            </Filter>
          ))}
        </Filters>
        <Grid
          cellRenderer={cellRenderer}
          columnCount={list[0].length}
          columnWidth={325}
          height={window.innerHeight - 314}
          rowCount={list.length}
          rowHeight={57}
          width={345}
          style={{ marginBottom: '20px', outline: 'none' }}
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
  }
}

export default SelectFont;
