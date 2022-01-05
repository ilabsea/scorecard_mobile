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
      if (state.isConnected) {
        scorecardSharingService.shareScorecardPdfFile(this.props.scorecard.uuid, this.props.updateLoadingStatus, this.props.updateErrorMessageModal, this.context.appLanguage);
        return;
      }

      internetConnectionService.showAlertMessage(this.context.translations.noInternetConnection);
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.shareSubmittedScorecard()} disabled={ isScorecardInReview(this.props.scorecard) }>
        <MaterialIcon name="share" size={22} color={ isScorecardInReview(this.props.scorecard) ? Color.disabledBtnBg : Color.whiteColor } />
      </TouchableOpacity>
    );
  }
}

export default ScorecardProgressShareButton;