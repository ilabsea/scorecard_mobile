import React, {Component} from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import HeaderIconButton from '../Share/HeaderIconButton';
import ConfirmationBottomSheetContent from '../Share/ConfirmationBottomSheetContent';
import DynamicHeightBottomSheetModal from '../DynamicHeightBottomSheetModal';

class SelectedImageHeader extends Component {
  static contextType = LocalizationContext;
  state = {};

  constructor(props) {
    super(props);
    this.confirmationModalRef = React.createRef();
  }

  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  renderRightButton() {
    if (!this.props.isScorecardFinished && this.props.hasDeleteButton)
      return <HeaderIconButton onPress={() => this.showConfirmation()} icon='trash' />

    return <View/>
  }

  showConfirmation() {
    const { translations } = this.context;
    this.confirmationModalRef.current?.setContent(
      <ConfirmationBottomSheetContent
        title={translations.removeTheImage}
        confirmationMessage={translations.doYouWantToRemoveTheImage}
        onPress={() => {
          this.confirmationModalRef.current?.dismiss();
          this.props.confirmDelete()
        }}
      />
    );
    this.confirmationModalRef.current?.present();
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <NavigationHeader
          title={translations.selectedImage}
          rightComponent={() => this.renderRightButton()}
          onBackPress={() => this._onPress()}
        />

        <DynamicHeightBottomSheetModal ref={this.confirmationModalRef} />
      </React.Fragment>
    )
  }
}

export default SelectedImageHeader;