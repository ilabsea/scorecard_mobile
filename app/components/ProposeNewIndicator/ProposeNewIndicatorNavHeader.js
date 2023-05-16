import React, { Component } from 'react';
import {BackHandler, TouchableWithoutFeedback} from 'react-native';
import { Body, Header, Left, Title } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack';

import { LocalizationContext } from '../Translations';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import { getDeviceStyle } from '../../utils/responsive_util';
import { pressableItemSize } from '../../utils/component_util';
import { navigationHeaderTitleFontSize } from '../../utils/font_size_util';
import { navigationRef } from '../../navigators/app_navigator';

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
          <Header style={{zIndex: -2}}>
            <Left style={{flex: 0.22, marginLeft: getDeviceStyle(-10, 0), justifyContent: 'center'}}>
              <HeaderBackButton tintColor={"#fff"} onPress={() => this.onBackPress()} style={{ marginLeft: getDeviceStyle(11, 0), width: pressableItemSize(), height: pressableItemSize() }} />
            </Left>
            <Body style={{flex: 2, marginLeft: 18}}>
              <Title style={{fontSize: navigationHeaderTitleFontSize()}}>
                { this.context.translations.proposeNewIndicatorTitle }
              </Title>
            </Body>
          </Header>
        </TouchableWithoutFeedback>

        { this.renderComfirmModal() }
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorNavHeader