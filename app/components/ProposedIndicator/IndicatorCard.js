import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import Color from '../../themes/color';

import { LocalizationContext } from '../Translations';
import ProposedIndicatorParticipant from '../Share/ProposedIndicatorParticipant';

import {getLanguageIndicator} from '../../services/language_indicator_service';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import Indicator from '../../models/Indicator';
import { getDeviceStyle } from '../../utils/responsive_util';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import IndicatorCardTabletStyle from '../../styles/tablet/IndicatorCardComponentStyle';
import IndicatorCardMobileStyle from '../../styles/mobile/IndicatorCardComponentStyle';

const styles = getDeviceStyle(IndicatorCardTabletStyle, IndicatorCardMobileStyle);

class IndicatorCard extends Component {
  static contextType = LocalizationContext;

  _getIndicatorName = (indicator) => {
    const languageIndicator = getLanguageIndicator(this.props.scorecardUuid, indicator.indicator_uuid, 'text');

    if (languageIndicator != undefined)
      return languageIndicator.content != '' ? languageIndicator.content : indicator.name.split(":").pop();

    return indicator.name.split(":").pop();
  }

  selectedIndicatorBoxStyle = (indicator) => {
    if (!this.props.isEdit && Indicator.isProposed(this.props.scorecardUuid, indicator.indicatorable_id, this.props.participantUuid))
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
        proposedIndicatorHelper.showParticipantListModal(this.props.formModalRef, this.props.participantModalRef, indicatorParams);
        return;
      }

      this.openFormModal(indicator);
    }
    else {
      proposedIndicatorService.handleCreateAndRemoveIndicator(this.props.scorecardUuid, indicator, this.props.participantUuid);
      setTimeout(() => {
        !!this.props.isExistedIndicator && this.props.participantModalRef.current?.dismiss();
        !!this.props.updateIndicatorList && this.props.updateIndicatorList();
      }, 50);
    }
  }

  openFormModal(indicator) {
    const proposedIndicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: indicator };
    proposedIndicatorHelper.showFormModal(this.props.formModalRef, this.props.participantModalRef, proposedIndicatorParams);
  }

  renderNumberOfParticipant() {
    if (!this.props.isIndicatorBase)
      return;

    if (Indicator.isProposed(this.props.scorecardUuid, this.props.indicator.indicatorable_id, this.props.participantUuid))
      return <View style={styles.raisedParticipantBadge}>
                <ProposedIndicatorParticipant
                  scorecardUuid={this.props.scorecardUuid}
                  indicator={this.props.indicator}
                  label={this.context.translations.proposed}
                  labelStyle={styles.raisedParticipantLabel}
                  numberStyle={styles.raisedLabel}
                />
             </View>
  }

  render() {
    const { indicator } = this.props;
    const displayName = this._getIndicatorName(indicator);

    return (
      <View style={[styles.indicatorBoxContainer, this.props.customCardStyle, this.selectedIndicatorBoxStyle(indicator)]}>
        {this.renderNumberOfParticipant()}

        <TouchableOpacity style={styles.indicatorBox} onPress={() => this.toggleIndicator(indicator)}>
          <View style={styles.detailContainer}>
            <Text style={styles.indicatorLabel} numberOfLines={3} ellipsizeMode='tail'>{displayName}</Text>
          </View>
        </TouchableOpacity>

        {/* Audio Button */}
        { this.props.children }
      </View>
    )
  }
}

export default IndicatorCard;
