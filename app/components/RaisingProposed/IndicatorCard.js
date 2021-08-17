import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../themes/color';

import {getLanguageIndicator} from '../../services/language_indicator_service';
import { normalLabelSize } from '../../utils/responsive_util';
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper'

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
    if (indicator.isSelected || (this.props.customIndicator != null && this.props.customIndicator.uuid == indicator.uuid))
      return { borderColor: Color.primaryButtonColor, borderWidth: 2 };

    for (let i = 0; i < this.props.selectedIndicators.length; i++) {
      if (this.props.selectedIndicators[i].uuid == indicator.uuid)
        return { borderColor: Color.primaryButtonColor, borderWidth: 2 };
    }

    return {};
  }

  _renderCard = () => {
    const { indicator, index } = this.props;
    let displayName = this._getIndicatorName(indicator);
    let iconContainerStyle = !!indicator.local_image ? {backgroundColor: 'transparent'} : {};
    let isAddNewCriteria = createNewIndicatorHelper.isAddNewIndicatorSection(index, this.props.indicators);

    if (isAddNewCriteria && this.props.isSearching)
      return <View/>;

    return (
      <View style={[styles.criteriaBoxContainer, this.selectedCriteriaBoxStyle(indicator)]}>
        <TouchableOpacity style={styles.criteriaBox}
          onPress={() => this.props.selectIndicator(index)}>
          { isAddNewCriteria && 
            <View style={[styles.iconContainer, iconContainerStyle]}>
              <MaterialIcon name="add" size={50} color={indicator.isSelected ? Color.whiteColor : Color.paleBlackColor} />
            </View>
          }

          <View style={styles.detailContainer}>
            <Text style={{textAlign: 'left', fontSize: normalLabelSize}} numberOfLines={3} ellipsizeMode='tail'>{displayName}</Text>
          </View>
        </TouchableOpacity>

        {/* Audio Button */}
        { !isAddNewCriteria &&
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