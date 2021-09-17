import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

import { LocalizationContext } from '../Translations';
import scorecardProgressService from '../../services/scorecard_progress_service';
import internetConnectionService from '../../services/internet_connection_service';

class ScorecardProgressShareButton extends Component {
  static contextType = LocalizationContext;

  shareSubmittedScorecard() {
     NetInfo.fetch().then(state => {
      if (state.isConnected)
        scorecardProgressService.sharePdfFile(this.props.scorecardUuid);
      else
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