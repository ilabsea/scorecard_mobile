import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import { getDeviceStyle } from '../../utils/responsive_util';

import MessageModal from '../MessageModal';
import NavigationHeader from '../NavigationHeader';
import HeaderIconButton from '../HeaderIconButton';

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

  renderRightButton() {
    if (!this.props.isScorecardFinished) {
      return (
        <View>
          { this.props.hasDeleteButton ?
            <HeaderIconButton onPress={() => this.setState({ visibleModal: true })} icon='trash' />
            :
            <HeaderIconButton onPress={() => this.props.openImagePicker()} icon='add' mobileIconSize={wp('7%')} />
          }
        </View>
      )
    }
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <NavigationHeader
          title={translations.selectedImage}
          bodyStyle={{flex: 1, paddingLeft: wp('2%')}}
          rightComponent={() => this.renderRightButton()}
          onBackPress={() => this._onPress()}
        />

        <MessageModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          onPressConfirmButton={() => this._confirmDelete()}
          child={() => this._confirmDeleteContent()}
          renderInline={true}
        />
      </React.Fragment>
    )
  }
}

export default SelectedImageHeader;