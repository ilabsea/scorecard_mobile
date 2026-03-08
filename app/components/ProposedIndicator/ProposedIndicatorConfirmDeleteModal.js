import React from 'react';

import { LocalizationContext } from '../Translations';
import ParticipantModalListItem from '../ParticipantModal/ParticipantModalListItem';

import ConfirmationBottomSheetContent from '../Share/ConfirmationBottomSheetContent';
import DynamicHeightBottomSheetModal from '../DynamicHeightBottomSheetModal';

class ProposedIndicatorConfirmDeleteModal extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.confirmationModalRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible != this.props.visible && !!this.props.visible) {
      const {translations} = this.context;

      this.confirmationModalRef.current?.setContent(
        <ConfirmationBottomSheetContent
          title={translations.deleteProposedIndicatorByParticipant}
          confirmationMessage={translations.doYouWantToDeleteTheProposedIndicatorsOfThisParticipant}
          customComponent={!!this.props.participant && <ParticipantModalListItem participant={this.props.participant} hasArrowIcon={false} hideDivider={true} containerStyle={{marginBottom: 0, paddingHorizontal: 10}} />}
          onPress={() => {
            this.confirmationModalRef.current?.dismiss();
            this.props.onConfirm();
          }}
        />
      );
      this.confirmationModalRef.current?.present();
    }
  }

  render() {
    return <DynamicHeightBottomSheetModal ref={this.confirmationModalRef} />
  }
}

export default ProposedIndicatorConfirmDeleteModal