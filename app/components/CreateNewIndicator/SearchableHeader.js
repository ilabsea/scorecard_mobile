import React, { Component } from 'react';
import { Header, Left } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack';

import CreateNewIndicatorTitle from './CreateNewIndicatorTitle';
import CreateNewIndicatorSearchInput from './CreateNewIndicatorSearchInput';
import { getDeviceStyle } from '../../utils/responsive_util';
import { pressableItemSize } from '../../utils/component_util';

class SearchableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
  }

  _onPress() {
    if (!this.props.onBackPress)
      return

    if (this.props.isSearching)
      this.cancel();
    else if (this.props.isEdit)
      this.props.updateEditStatus(false);
    else
      this.props.onBackPress();
  }

  onChangeSearch(text) {
    this.setState({ query: text });
    this.props.updateSearchedName(text);
  }

  cancel() {
    this.onChangeSearch('');
    this.props.updateSearchedName('');
    this.props.updateSearchStatus(false);
  }

  _renderSearchBox() {
    return (
      <CreateNewIndicatorSearchInput
        query={this.state.query}
        onChangeSearch={(text) => this.onChangeSearch(text)}
        clearSearch={() => this.onChangeSearch('')}
      />
    )
  }

  _renderTitle() {
    return (
      <CreateNewIndicatorTitle
        isEdit={this.props.isEdit}
        toggleSearch={() => this.props.updateSearchStatus(true)}
        editIndicator={() => this.props.updateEditStatus(true)}
      />
    )
  }

  render() {
    return (
      <Header searchBar>
        <Left style={{flex: 0.22, marginLeft: getDeviceStyle(-10, 0), justifyContent: 'center'}}>
          <HeaderBackButton tintColor={"#fff"} onPress={() => this._onPress()} style={{ marginLeft: getDeviceStyle(11, 0), width: pressableItemSize(), height: pressableItemSize() }} />
        </Left>
        { !this.props.isSearching ? this._renderTitle() : this._renderSearchBox() }
      </Header>
    )
  }
}

export default SearchableHeader;
