import React, { Component } from 'react';
import { Header, Left } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack';

import CreateNewIndicatorSearchTitle from './CreateNewIndicatorSearchTitle';
import CreateNewIndicatorSearchInput from './CreateNewIndicatorSearchInput';
import { LocalizationContext } from '../Translations';
import IndicatorService from '../../services/indicator_service';
import customIndicatorService from '../../services/custom_indicator_service';

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
    else
      this.props.onBackPress();
  }

  onChangeSearch(text, isCancel) {
    this.setState({ query: text });

    if (!this.props.isEdit || isCancel) {
      const { translations } = this.context;
      const allIndicator = new IndicatorService().getIndicatorList(this.props.scorecardUuid, this.props.participantUuid, text, translations.addNewCriteria);

      this.props.updateSearchedIndicator(allIndicator.indicators, allIndicator.selectedIndicators);
    }
    else {
      const allIndicator = customIndicatorService.getIndicatorList(this.props.scorecardUuid, text);
      this.props.updateSearchedIndicator(allIndicator, []);
    }
  }

  cancel() {
    this.onChangeSearch('', true);
    this.toggleSearch(false, false);
  }

  _renderSearchBox() {
    return (
      <CreateNewIndicatorSearchInput
        query={this.state.query}
        onChangeSearch={(text) => this.onChangeSearch(text, false)}
        clearSearch={() => this.onChangeSearch('', false)}
      />
    )
  }

  _renderTitle() {
    return <CreateNewIndicatorSearchTitle toggleSearch={(isEdit) => this.toggleSearch(true, isEdit)} />
  }

  toggleSearch(status, isEdit) {
    this.setState({ isSearch: status });
    this.props.updateSearchStatus(status);
    this.props.updateIsEditStatus(isEdit);
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