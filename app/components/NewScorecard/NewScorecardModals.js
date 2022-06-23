import React, { Component } from 'react';

// import ErrorMessageModal from '../ErrorMessageModal/ErrorMessageModal';
// import ScorecardInfoModal from './ScorecardInfoModal';
import { LocalizationContext } from '../Translations';
import BoldLabel from '../Share/BoldLabel';
import CustomAlertMessage from '../Share/CustomAlertMessage';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';
import { getApiRequestErrorMessage } from '../../utils/api_error_util';
import scorecardProgress from '../../db/jsons/scorecardProgress';
import Scorecard from '../../models/Scorecard';
import { navigate } from '../../navigators/app_navigator';

class NewScorecardModals extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      alertMessage: {},
      scorecard: null,
    }
  }

  async componentDidUpdate(prevProps) {
    const { translations, appLanguage } = this.context;
    const localization = {
      translations,
      app_language: appLanguage
    }

    if (this.props.visibleModal && this.props.visibleModal != prevProps.visibleModal) {
      const { errorType, scorecardUuid, unlockAt } = this.props;

      this.setState({
        alertMessage: !!errorType ? await getApiRequestErrorMessage(errorType, scorecardUuid, unlockAt, localization) : this.getScorecardInfoMessage(),
      }, () => console.log('alert message == ', this.state.alertMessage))
    }
  }

  getScorecardInfoMessage() {
    const { translations } = this.context;
    const scorecardCode = <BoldLabel label={this.props.scorecardUuid} />

    if (!this.props.hasMatchedEndpoint)
      return {
        title: translations.theServerUrlHasBeenChanged,
        description: translations.formatString(translations.theServerUrlHasBeenChangedDescription, scorecardCode)
      }
    else if (this.props.isSubmitted)
      return {
        title: translations.scorecardIsSubmitted,
        description: translations.formatString(translations.thisScorecardIsAlreadySubmitted, scorecardCode),
        rightSideButton: translations.viewDetail,
        rightSideButtonAction: () => this.goToScorecardProgress(),
      }

    const scorecard = Scorecard.find(this.props.scorecardUuid);
    this.setState({ scorecard });
    const step = scorecardProgress[scorecard.status - 1];
    const scorecardStep = <BoldLabel label={`"${translations[step.label]}"`} />

    return {
      title: translations.scorecardIsInStep,
      description: translations.formatString(translations.thisScorecardIsInStep, scorecardCode, scorecardStep),
      rightSideButton: translations.viewDetail,
      rightSideButtonAction: () => this.continueScorecard(),
    }
  }

  continueScorecard = () => {
    const step = scorecardProgress[this.state.scorecard.status - 1];
    this.props.closeModal(false);      // user clicked on view detail so the auto focus on text input is false
    navigate(step.routeName, { scorecard_uuid: this.props.scorecardUuid, local_ngo_id: this.state.scorecard.local_ngo_id });
  }

  goToScorecardProgress = () => {
    this.props.closeModal(false);           // user clicked on view detail so the auto focus on text input is false
    this.props.setCurrentScorecard(this.state.scorecard);
    navigate('ScorecardProgress', {uuid: this.state.scorecard.uuid, title: this.state.scorecard.displayName});
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <CustomAlertMessage
          visible={this.props.visibleModal}
          title={!!this.state.alertMessage ? this.state.alertMessage.title : ''}
          description={!!this.state.alertMessage ? this.state.alertMessage.description : ''}
          closeButtonLabel={ translations.close }
          hasConfirmButton={!!this.state.alertMessage.rightSideButton}
          confirmButtonLabel={this.state.alertMessage.rightSideButton || ''}
          isConfirmButtonDisabled={false}
          onDismiss={() => this.props.closeModal(true)}
          onConfirm={() => !!this.state.alertMessage.rightSideButtonAction && this.state.alertMessage.rightSideButtonAction()}
        />

        {/* <ScorecardInfoModal
          visible={this.props.visibleInfoModal}
          onDismiss={(hasAutoFocus) => this.props.closeModal(hasAutoFocus)}
          isSubmitted={this.props.isSubmitted}
          scorecardUuid={this.props.scorecardUuid}
          hasMatchedEndpoint={this.props.hasMatchedEndpoint}
          setCurrentScorecard={(scorecard) => this.props.setCurrentScorecard(scorecard)}
        /> */}
      </React.Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(NewScorecardModals);