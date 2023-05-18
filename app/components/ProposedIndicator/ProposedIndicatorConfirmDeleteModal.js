import React from 'react';

import { LocalizationContext } from '../Translations';
import ParticipantModalListItem from '../ParticipantModal/ParticipantModalListItem';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import CustomAlertMessageMain from '../Share/CustomAlertMessage/CustomAlertMessageMain';

class ProposedIndicatorConfirmDeleteModal extends React.Component {
  static contextType = LocalizationContext;
  render() {
    const {translations} = this.context;
    return (
      <CustomAlertMessage
        visible={this.props.visible}
        title={translations.deleteProposedIndicatorByParticipant}
        closeButtonLabel={translations.close}
        hasConfirmButton={true}
        confirmButtonLabel={translations.ok}
        isConfirmButtonDisabled={false}
        onDismiss={() => this.props.onDismiss()}
        onConfirm={() => this.props.onConfirm()}
        titleStyle={{textAlign: 'center'}}
      >
        <CustomAlertMessageMain description={translations.doYouWantToDeleteTheProposedIndicatorsOfThisParticipant} customStyle={{marginBottom: 0}} />
        { !!this.props.participant && <ParticipantModalListItem participant={this.props.participant} hasArrowIcon={false} hideDivider={true} containerStyle={{marginBottom: -10, paddingHorizontal: 10}} />}
      </CustomAlertMessage>
    )
  }
}

export default ProposedIndicatorConfirmDeleteModal