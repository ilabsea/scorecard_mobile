import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

import { LocalizationContext } from '../Translations';
import scorecardSharingService from '../../services/scorecard_sharing_service';
import internetConnectionService from '../../services/internet_connection_service';
import Scorecard from '../../models/Scorecard';
import Color from '../../themes/color';
import { ERROR_SHARE_PDF_MISMATCH_ENDPOINT } from '../../constants/error_constant';
import { pressableItemSize } from '../../utils/component_util';

class ScorecardProgressShareButton extends Component {
  static contextType = LocalizationContext;

  async shareSubmittedScorecard() {
    if (!await Scorecard.isShareable(this.props.scorecard.uuid, this.context.appLanguage)) {
      this.props.updateErrorMessageModal(ERROR_SHARE_PDF_MISMATCH_ENDPOINT, true);
      return;
    }

    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        scorecardSharingService.shareScorecardPdfFile(this.props.scorecard.uuid, this.props.updateLoadingStatus, this.props.updateErrorMessageModal, this.context.appLanguage);
        return;
      }

      internetConnectionService.showAlertMessage(this.context.translations.noInternetConnection);
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.shareSubmittedScorecard()} disabled={ !this.props.scorecard.isCompleted }
        style={{height: pressableItemSize(), width: pressableItemSize(), justifyContent: 'center', alignItems: 'flex-end', marginRight: 16}}
      >
        <MaterialIcon name="share" size={22} color={ !this.props.scorecard.isCompleted ? Color.disabledBtnBg : Color.whiteColor } />
      </TouchableOpacity>
    );
  }
}

export default ScorecardProgressShareButton;