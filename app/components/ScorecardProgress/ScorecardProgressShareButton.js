import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

import { LocalizationContext } from '../Translations';
import scorecardSharingService from '../../services/scorecard_sharing_service';
import internetConnectionService from '../../services/internet_connection_service';
import { isScorecardInReview } from '../../utils/scorecard_util';
import Color from '../../themes/color';

class ScorecardProgressShareButton extends Component {
  static contextType = LocalizationContext;

  shareSubmittedScorecard() {
     NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        scorecardSharingService.shareScorecardPdfFile(this.props.scorecard.uuid, this.props.updateLoadingStatus, this.props.updateErrorMessageModal, this.context.appLanguage);
        return;
      }

      internetConnectionService.showAlertMessage(this.context.translations.noInternetConnection);
    });
  }

  isDisabled() {
    return !this.props.hasMatchedEndpointUrl || isScorecardInReview(this.props.scorecard)
  }

  renderWarningIcon() {
    if (!this.props.hasMatchedEndpointUrl)
      return <MaterialIcon name='error' size={17} color={ Color.whiteColor }
                style={{ position: 'absolute', top: -6, right: -8}}
             />
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.shareSubmittedScorecard()}
        disabled={ this.isDisabled() }
      >
        <MaterialIcon name="share" size={22} color={ this.isDisabled() ? Color.disabledBtnBg : Color.whiteColor } />

        { this.renderWarningIcon() }
      </TouchableOpacity>
    );
  }
}

export default ScorecardProgressShareButton;