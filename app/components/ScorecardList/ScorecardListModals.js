import React, { Component } from 'react';

import ErrorAlertMessage from '../Share/ErrorAlertMessage';
import BoldLabel from '../Share/BoldLabel';
import ScorecardListInstructionModal from './ScorecardListInstructionModal';
import ConfirmationBottomSheetContent from '../Share/ConfirmationBottomSheetContent';
import DynamicHeightBottomSheetModal from '../DynamicHeightBottomSheetModal';
import { LocalizationContext } from '../Translations';
import { ERROR_AUTHENTICATION } from '../../constants/error_constant';

class ScorecardListModals extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.confirmationModalRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (!!this.props.visibleConfirmModal && (prevProps.visibleConfirmModal != this.props.visibleConfirmModal)) {
      const { translations } = this.context;
      const scorecardUuid = <BoldLabel label={this.props.scorecardUuid} />
      const title = this.props.isConfirmModal ? translations.deleteTheScorecard : translations.unableToDeleteTheScorecard;
      const description = this.props.isConfirmModal
        ? translations.formatString(translations.doYouWantToDeleteThisScorecard, scorecardUuid)
        : translations.formatString(translations.cannotDeleteThisScorecard, scorecardUuid);

      this.confirmationModalRef.current?.setContent(
        <ConfirmationBottomSheetContent
          title={title}
          confirmationMessage={description}
          onPress={() => {
            this.props.confirmDelete()
            setTimeout(() => {
              this.confirmationModalRef.current?.dismiss();
            }, 500);
          }}
        />
      );
      this.confirmationModalRef.current?.present();
    }
  }

  render() {
    return (
      <React.Fragment>
        <DynamicHeightBottomSheetModal
          ref={this.confirmationModalRef}
          onDismiss={() => this.props.onConfirmModalDismiss()}
        />

        <ErrorAlertMessage
          visible={this.props.visibleErrorModal}
          errorType={ERROR_AUTHENTICATION}
          scorecardUuid={this.props.scorecardUuid}
          onDismiss={() => this.props.onErrorModalDismiss()}
        />

        <ScorecardListInstructionModal headerHeight={this.props.headerHeight} scorecards={this.props.scorecards} />
      </React.Fragment>
    )
  }
}

export default ScorecardListModals;