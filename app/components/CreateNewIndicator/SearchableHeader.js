import React, { Component } from 'react';
import { Header, Left } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack';

import { LocalizationContext } from '../Translations';
import CreateNewIndicatorTitle from './CreateNewIndicatorTitle';
import CreateNewIndicatorSearchInput from './CreateNewIndicatorSearchInput';
import MessageModal from '../MessageModal';
import { getDeviceStyle } from '../../utils/responsive_util';
import { pressableItemSize } from '../../utils/component_util';

class SearchableHeader extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      isModalVisible: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.searchedName == '' && state.query != props.searchedName)
      return { query: props.searchedName };

    return null;
  }

  _onPress() {
    if (this.props.isSearching)
      this.cancel();
    else if (this.props.isEdit)
      this.props.updateEditStatus(false);
    else
      this.setState({ isModalVisible: true });
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

  confirmGoBack() {
    this.setState({ isModalVisible: false });
    !!this.props.onBackPress && this.props.onBackPress()
  }

  renderComfirmModal() {
    return <MessageModal
            visible={this.state.isModalVisible}
            onDismiss={() => this.setState({isModalVisible: false})}
            description={this.context.translations.doYouWantToReturnToPreviousScreen}
            hasConfirmButton={true}
            confirmButtonLabel={this.context.translations.ok}
            onPressConfirmButton={() => this.confirmGoBack()}
          />
  }

  render() {
    return (
      <React.Fragment>
        <Header searchBar>
          <Left style={{flex: 0.22, marginLeft: getDeviceStyle(-10, 0), justifyContent: 'center'}}>
            <HeaderBackButton tintColor={"#fff"} onPress={() => this._onPress()} style={{ marginLeft: getDeviceStyle(11, 0), width: pressableItemSize(), height: pressableItemSize() }} />
          </Left>
          { !this.props.isSearching ? this._renderTitle() : this._renderSearchBox() }
        </Header>

        { this.renderComfirmModal() }
      </React.Fragment>
    )
  }
}

export default SearchableHeader;