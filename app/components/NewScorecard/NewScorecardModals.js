import React, { Component } from 'react';

import ErrorMessageModal from '../ErrorMessageModal/ErrorMessageModal';
import ScorecardInfoModal from './ScorecardInfoModal';
import { LocalizationContext } from '../Translations';

import CustomAlertMessage from '../Share/CustomAlertMessage';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';
import { getApiRequestErrorMessage } from '../../utils/api_error_util';

class NewScorecardModals extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      error: {}
    }
  }

  async componentDidUpdate(prevProps) {
    const { translations, appLanguage } = this.context;
    const localization = {
      translations,
      app_language: appLanguage
    }

    if (this.props.visibleErrorModal && this.props.visibleErrorModal != prevProps.visibleErrorModal)
      this.setState({
        // error: await getApiRequestErrorMessage(this.props.errorType, this.props.scorecardUuid, this.props.unlockAt, translations)
        error: await getApiRequestErrorMessage(this.props.errorType, this.props.scorecardUuid, this.props.unlockAt, localization)
      })
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <CustomAlertMessage
          visible={this.props.visibleErrorModal}
          title={!!this.state.error ? this.state.error.title : ''}
          description={!!this.state.error ? this.state.error.description : ''}
          closeButtonLabel={ translations.close }
          onDismiss={() => this.props.closeModal(true)}
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