import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Color from '../../themes/color';

import {getLanguageIndicator} from '../../services/language_indicator_service';
import { normalLabelSize } from '../../utils/responsive_util';

import { getDeviceStyle } from '../../utils/responsive_util';
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
    if (indicator.isSelected)
      return { borderColor: Color.primaryButtonColor, borderWidth: 2 };

    for (let i = 0; i < this.props.selectedIndicators.length; i++) {
      if (this.props.selectedIndicators[i].uuid == indicator.uuid)
        return { borderColor: Color.primaryButtonColor, borderWidth: 2 };
    }

    return {};
  }

  _renderCard = () => {
    const { indicator, index } = this.props;
    const displayName = this._getIndicatorName(indicator);

    return (
      <View style={[styles.criteriaBoxContainer, this.selectedCriteriaBoxStyle(indicator)]}>
        <TouchableOpacity style={styles.criteriaBox}
          onPress={() => this.props.selectIndicator(index)}
        >
          <View style={styles.detailContainer}>
            <Text style={{textAlign: 'left', fontSize: normalLabelSize}} numberOfLines={3} ellipsizeMode='tail'>{displayName}</Text>
          </View>
        </TouchableOpacity>

        {/* Audio Button */}
        { this.props.children }
      </View>
    )
  }


  render() {
    return this._renderCard();
  }
}

export default IndicatorCard;