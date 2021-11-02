import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

import { LocalizationContext } from '../Translations';
import scorecardSharingService from '../../services/scorecard_sharing_service';
import internetConnectionService from '../../services/internet_connection_service';

class ScorecardProgressShareButton extends Component {
  static contextType = LocalizationContext;

  shareSubmittedScorecard() {
     NetInfo.fetch().then(state => {
      if (state.isConnected) {
        scorecardSharingService.shareScorecardPdfFile(this.props.scorecardUuid, this.props.updateLoadingStatus, this.props.updateErrorMessageModal, this.context.appLanguage);
        return;
      }

      internetConnectionService.showAlertMessage(this.context.translations.noInternetConnection);
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.shareSubmittedScorecard()}>
        <MaterialIcon name="share" size={22} color="white" />
      </TouchableOpacity>
    );
  }
}

export default ScorecardProgressShareButton;