import React, { Component } from 'react';
import {BackHandler, TouchableWithoutFeedback} from 'react-native';
import { Header, Left } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack';

import { LocalizationContext } from '../Translations';
import NavigationHeaderBody from '../NavigationHeaderBody'
import CustomAlertMessage from '../Share/CustomAlertMessage';
import { navigationBackButtonFlex } from '../../utils/responsive_util';
import { pressableItemSize } from '../../utils/component_util';
import { navigationRef } from '../../navigators/app_navigator';
import Color from '../../themes/color';

class ProposeNewIndicatorNavHeader extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = { isModalVisible: false };
    this.backHandler = null;
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.bottomSheetRef.current?.isOpen())
        this.props.formModalRef.current?.dismiss()
      else
        this.onBackPress()

      return true;
    })
  }

  componentWillUnmount() {
    !!this.backHandler && this.backHandler.remove()
  }

  confirmGoBack() {
    this.setState({ isModalVisible: false });
    !!this.props.handleUnconfirmedIndicator && this.props.handleUnconfirmedIndicator();
    setTimeout(() => {
      navigationRef.current?.goBack();
    }, 500)
  }

  renderComfirmModal() {
    const { translations } = this.context;
    return <CustomAlertMessage
              visible={this.state.isModalVisible}
              title={translations.discardTheChanges}
              description={translations.areYouSureYouWantToDiscardTheseNewProposedIndicator}
              closeButtonLabel={translations.buttonLabelNo}
              hasConfirmButton={true}
              confirmButtonLabel={translations.buttonLabelYes}
              isConfirmButtonDisabled={false}
              onDismiss={() => this.setState({isModalVisible: false})}
              onConfirm={() => this.confirmGoBack()}
           />
  }

  onBackPress = () => {
    if (this.props.searchBoxRef.current?.state.showResult)
      return this.props.searchBoxRef.current?.closeSearch()

    this.setState({isModalVisible: true})
  }

  render() {
    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={() => this.props.searchBoxRef.current?.closeSearch()}>
          <Header>
            <Left style={{ flex: navigationBackButtonFlex, marginRight: -10 }}>
              <HeaderBackButton tintColor={Color.whiteColor} onPress={() => this.onBackPress()} style={{ marginLeft: 0, width: pressableItemSize(), height: pressableItemSize() }} />
            </Left>
            <NavigationHeaderBody title={this.context.translations.proposeNewIndicatorTitle} />
          </Header>
        </TouchableWithoutFeedback>

        { this.renderComfirmModal() }
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorNavHeader