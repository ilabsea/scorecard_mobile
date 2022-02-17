import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Color from '../../themes/color';

import {getLanguageIndicator} from '../../services/language_indicator_service';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedIndicator from '../../models/ProposedIndicator';
import CriteriaSelectionTabletStyle from '../../styles/tablet/CriteriaSelectionComponentStyle';
import CriteriaSelectionMobileStyle from '../../styles/mobile/CriteriaSelectionComponentStyle';

const styles = getDeviceStyle(CriteriaSelectionTabletStyle, CriteriaSelectionMobileStyle);

class IndicatorCard extends Component {

  _getIndicatorName = (indicator) => {
    const languageIndicator = getLanguageIndicator(this.props.scorecardUuid, indicator.uuid, 'text');

    if (languageIndicator != undefined)
      return languageIndicator.content != '' ? languageIndicator.content : indicator.name.split(":").pop();

    return indicator.name.split(":").pop();
  }

  selectedCriteriaBoxStyle = (indicator) => {
    if (!!ProposedIndicator.findByParticipant(this.props.scorecardUuid, indicator.uuid, this.props.participantUuid))
      return { borderColor: Color.primaryButtonColor, borderWidth: 2 };

    return {};
  }

  toggleIndicator(indicator) {
    if (this.props.isEdit) {
      !!this.props.selectForEdit && this.props.selectForEdit(indicator);
      return;
    }

    proposedIndicatorService.handleCreateAndRemoveIndicator(this.props.scorecardUuid, indicator, this.props.participantUuid);
    !!this.props.updateIndicatorList && this.props.updateIndicatorList();
  }

  render() {
    const { indicator } = this.props;
    const displayName = this._getIndicatorName(indicator);

    return (
      <View style={[styles.criteriaBoxContainer, this.props.customCardStyle, this.selectedCriteriaBoxStyle(indicator)]}>
        <TouchableOpacity style={styles.criteriaBox}
          onPress={() => this.toggleIndicator(indicator)}
        >
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