import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles/CriteriaSelectionStyle';
import Color from '../../themes/color';

import {getLanguageIndicator} from '../../services/language_indicator_service';
import { normalLabelSize } from '../../utils/responsive_util';

class IndicatorCard extends Component {

  _getIndicatorName = (indicator) => {
    const languageIndicator = getLanguageIndicator(this.props.scorecardUuid, indicator.uuid, 'text');

    if (languageIndicator != undefined)
      return languageIndicator.content != '' ? languageIndicator.content : indicator.name.split(":").pop();

    return indicator.name.split(":").pop();
  }

  selectedCriteriaBoxStyle = (indicator) => {
    if (indicator.isSelected || (this.props.customIndicator != null && this.props.customIndicator.uuid == indicator.uuid))
      return { borderColor: Color.primaryButtonColor, borderWidth: 2 };

    return {};
  }

  _renderCard = () => {
    const { indicator, index } = this.props;
    let displayName = this._getIndicatorName(indicator);
    let iconContainerStyle = !!indicator.local_image ? {backgroundColor: 'transparent'} : {};
    let isAddNewCriteriaIndex = index == this.props.indicators.length - 1;

    return (
      <View key={index} style={[styles.criteriaBoxContainer, this.selectedCriteriaBoxStyle(indicator)]}>
        <TouchableOpacity style={styles.criteriaBox}
          onPress={() => this.props.selectIndicator(index)}>
          { isAddNewCriteriaIndex && 
            <View style={[styles.iconContainer, iconContainerStyle]}>
              <MaterialIcon name="add" size={50} color={indicator.isSelected ? "#ffffff" : "#787878"} />
            </View>
          }

          <View style={styles.detailContainer}>
            <Text style={{textAlign: 'left', fontSize: normalLabelSize}} numberOfLines={3} ellipsizeMode='tail'>{displayName}</Text>
          </View>
        </TouchableOpacity>

        {/* Audio Button */}
        { index != this.props.indicators.length - 1 &&
          this.props.children
        }
      </View>
    )
  }


  render() {
    return this._renderCard();
  }
}

export default IndicatorCard;