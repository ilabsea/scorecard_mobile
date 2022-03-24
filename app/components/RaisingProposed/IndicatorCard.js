import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import Color from '../../themes/color';

import {getLanguageIndicator} from '../../services/language_indicator_service';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedIndicator from '../../models/ProposedIndicator';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import IndicatorCardTabletStyle from '../../styles/tablet/IndicatorCardComponentStyle';
import IndicatorCardMobileStyle from '../../styles/mobile/IndicatorCardComponentStyle';

const styles = getDeviceStyle(IndicatorCardTabletStyle, IndicatorCardMobileStyle);

class IndicatorCard extends Component {
  _getIndicatorName = (indicator) => {
    const languageIndicator = getLanguageIndicator(this.props.scorecardUuid, indicator.indicatorable_id, 'text');

    if (languageIndicator != undefined)
      return languageIndicator.content != '' ? languageIndicator.content : indicator.name.split(":").pop();

    return indicator.name.split(":").pop();
  }

  isProposedIndicatorExisted(indicator) {
    return !!ProposedIndicator.findByParticipant(this.props.scorecardUuid, indicator.indicatorable_id, this.props.participantUuid);
  }

  selectedIndicatorBoxStyle = (indicator) => {
    if (this.isProposedIndicatorExisted(indicator))
      return { borderColor: Color.primaryButtonColor, borderWidth: 2 };

    return {};
  }

  toggleIndicator(indicator) {
    if (this.props.isEdit) {
      !!this.props.selectForEdit && this.props.selectForEdit(indicator);
      return;
    }

    Keyboard.dismiss();
    if (this.props.isIndicatorBase) {
      if (this.props.isExistedIndicator) {
        const indicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: indicator };
        proposedIndicatorHelper.showParticipantListModal(this.props.formRef, this.props.participantModalRef, indicatorParams, this.props.updateIndicatorList);
        return;
      }

      this.openFormModal(indicator);
    }
    else {
      proposedIndicatorService.handleCreateAndRemoveIndicator(this.props.scorecardUuid, indicator, this.props.participantUuid);
      setTimeout(() => {
        !!this.props.updateIndicatorList && this.props.updateIndicatorList();
      }, 50);
    }
  }

  openFormModal(indicator) {
    const proposedIndicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: indicator };
    proposedIndicatorHelper.showFormModal(this.props.formRef, this.props.participantModalRef, proposedIndicatorParams, this.props.updateIndicatorList);
  }

  render() {
    const { indicator } = this.props;
    const displayName = this._getIndicatorName(indicator);

    return (
      <View style={[styles.indicatorBoxContainer, this.props.customCardStyle, this.selectedIndicatorBoxStyle(indicator)]}>
        <TouchableOpacity style={styles.indicatorBox} onPress={() => this.toggleIndicator(indicator)}>
          <View style={styles.detailContainer}>
            <Text style={{textAlign: 'left', fontSize: bodyFontSize()}} numberOfLines={3} ellipsizeMode='tail'>{displayName}</Text>
          </View>
        </TouchableOpacity>

        {/* Audio Button */}
        { this.props.children }
      </View>
    )
  }
}

export default IndicatorCard;
