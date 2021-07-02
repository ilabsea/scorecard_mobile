import React, {Component} from 'react';
import { View, Text } from 'react-native';

import {
  Header,
  Title,
  Icon,
  Left,
  Right,
  Body,
  Button,
} from "native-base";

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { HeaderBackButton } from '@react-navigation/stack';
import { LocalizationContext } from '../Translations';
import { getDeviceStyle, mobileHeadingTitleSize } from '../../utils/responsive_util';

import Color from '../../themes/color';
import MessageModal from '../MessageModal';

import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';
const modalStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class SelectedImageHeader extends Component {
  static contextType = LocalizationContext;
  state = {};

  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  _confirmDeleteContent() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={modalStyles.label}>
          { translations.doYouWantToRemoveTheImage }
        </Text>
      </View>
    )
  }

  _confirmDelete() {
    this.props.confirmDelete();
    this.setState({ visibleModal: false });
  }

  render() {
    const { translations } = this.context;

    return (
      <Header style={{alignItems: 'center'}}>
        <Left>
          <HeaderBackButton tintColor={Color.whiteColor} onPress={() => this._onPress()} style={{ marginLeft: getDeviceStyle(11, 0) }} />
        </Left>

        <Body style={{flex: 2}}>
          <Title style={{fontSize: getDeviceStyle(19, mobileHeadingTitleSize())}}>{ translations.selectedImage }</Title>
        </Body>

        <Right>
          { this.props.hasDeleteButton ?
              <Button transparent onPress={() => this.setState({ visibleModal: true })}>
                <Icon name='trash' style={{fontSize: getDeviceStyle(24, wp('6%')), marginTop: -3, marginRight: getDeviceStyle(16, 0)}} />
              </Button>
            :
            <Button transparent onPress={() => this.props.openImagePicker()}>
              <Icon name='add' style={{fontSize: getDeviceStyle(24, wp('8%')), marginTop: -3, marginRight: getDeviceStyle(16, 0)}} />
            </Button>
          }
        </Right>

        <MessageModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          onPressConfirmButton={() => this._confirmDelete()}
          child={() => this._confirmDeleteContent()}
          renderInline={true}
        />
      </Header>
    )
  }
}

export default SelectedImageHeader;