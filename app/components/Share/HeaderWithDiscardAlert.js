import React from 'react';

import { LocalizationContext } from '../Translations';
import HeaderWithConfirmModal from './HeaderWithConfirmModal';

import { navigateBack } from '../../utils/navigation_util';

class HeaderWithDiscardAlert extends React.Component {
  static contextType = LocalizationContext;
  state = {
    visibleConfirmModal: false
  }

  async onBackPress() {
    if (await this.props.hasDiscardAlert())
      this.setState({ visibleConfirmModal: true })
    else
      this.goBack();
  }

  goBack() {
    this.setState({ visibleConfirmModal: false }, () => {
      !!this.props.onGoBack && this.props.onGoBack();
      navigateBack();
    });
  }

  render() {
    const { translations } = this.context;

    return <HeaderWithConfirmModal
              title={this.props.title}
              modalTitle={this.props.modalTitle|| translations.discardTheChanges}
              modalDescription={this.props.modalDescription || translations.doYouWantToDiscardTheseChanges}
              visibleConfirmModal={this.state.visibleConfirmModal}
              onBackPress={() => this.onBackPress()}
              goBack={() => this.goBack()}
              onDismiss={() => this.setState({ visibleConfirmModal: false })}
           />
  }
}

export default HeaderWithDiscardAlert;