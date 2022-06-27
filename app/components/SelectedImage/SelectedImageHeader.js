import React, {Component} from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import NavigationHeader from '../NavigationHeader';
import HeaderIconButton from '../Share/HeaderIconButton';

class SelectedImageHeader extends Component {
  static contextType = LocalizationContext;
  state = {};

  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  _confirmDelete() {
    this.props.confirmDelete();
    this.setState({ visibleModal: false });
  }

  renderRightButton() {
    if (!this.props.isScorecardFinished && this.props.hasDeleteButton)
      return <HeaderIconButton onPress={() => this.setState({ visibleModal: true })} icon='trash' />

    return <View/>
  }

  renderAlertMessage() {
    const { translations } = this.context;
    return <CustomAlertMessage
              visible={this.state.visibleModal}
              title={translations.removeTheImage}
              description={translations.doYouWantToRemoveTheImage}
              closeButtonLabel={translations.close}
              hasConfirmButton={true}
              confirmButtonLabel={translations.ok}
              isConfirmButtonDisabled={false}
              onDismiss={() => this.setState({visibleModal: false})}
              onConfirm={() => this._confirmDelete()}
           />
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

        { this.renderAlertMessage() }
      </React.Fragment>
    )
  }
}

export default SelectedImageHeader;