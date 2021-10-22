import React, { Component } from 'react';
import { Header, Left } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack';

import CreateNewIndicatorTitle from './CreateNewIndicatorTitle';
import CreateNewIndicatorSearchInput from './CreateNewIndicatorSearchInput';
import { LocalizationContext } from '../Translations';
import IndicatorService from '../../services/indicator_service';
import { getDeviceStyle, navigationBackButtonFlex } from '../../utils/responsive_util';

class SearchableHeader extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      isSearch: false,
      query: ''
    };
  }

  _onPress() {
    if (!this.props.onBackPress)
      return

    if (this.state.isSearch)
      this.cancel();
    else if (this.props.isEdit)
      this.props.updateIsEditStatus(false);
    else
      this.props.onBackPress();
  }

  onChangeSearch(text) {
    const { translations } = this.context;
    this.setState({ query: text });
    const allIndicator = new IndicatorService().getIndicatorList(this.props.scorecardUuid, text, translations.addNewCriteria, this.props.selectedIndicators);

    this.props.updateSearchedIndicator(allIndicator.indicators, allIndicator.selectedIndicators);
  }

  cancel() {
    this.onChangeSearch('');
    this.toggleSearch(false);
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
        toggleSearch={() => this.toggleSearch(true)}
        editIndicator={() => this.props.updateIsEditStatus(true)}
      />
    )
  }

  toggleSearch(status) {
    this.setState({ isSearch: status });
    this.props.updateSearchStatus(status);
  }

  render() {
    return (
      <Header searchBar>
        <Left style={{flex: navigationBackButtonFlex, marginLeft: getDeviceStyle(-10, 0), justifyContent: 'center'}}>
          <HeaderBackButton tintColor={"#fff"} onPress={() => this._onPress()} style={{ marginLeft: getDeviceStyle(11, 0) }} />
        </Left>
        { !this.state.isSearch ? this._renderTitle() : this._renderSearchBox() }
      </Header>
    )
  }
}

export default SearchableHeader;