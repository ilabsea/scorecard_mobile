import React, {Component} from 'react';
import { View, Text } from 'react-native';

import Color from '../../themes/color';
import styles from '../../themes/scorecardListItemStyle';

import { LocalizationContext } from '../Translations';
import VotingCriteria from '../../models/VotingCriteria';
import scorecardHelper from '../../helpers/scorecard_helper';
import { getDeviceStyle } from '../../utils/responsive_util';

const subTextFontSize = getDeviceStyle(13, 12);

class ScorecardListInfoScorecardDetial extends Component {
  static contextType = LocalizationContext;

  renderConductedDate() {
    const {scorecard} = this.props;

    if (scorecard.conducted_date)
      return (
        <Text style={{ flex: 1, textAlign: 'right', color: Color.grayColor, fontSize: subTextFontSize, marginTop: getDeviceStyle(2, 4)}}>
          { !!scorecard.conducted_date ? scorecardHelper.getTranslatedDate(scorecard.conducted_date, this.context.appLanguage, 'DD MMM') : '' }
        </Text>
      )
  }

  render() {
    const { scorecard } = this.props;
    const criteriasSize = VotingCriteria.getAll(scorecard.uuid).length;
    const subTextStyles = { paddingTop: getDeviceStyle(2, 1), fontSize: subTextFontSize, marginLeft: 0};
    const subTitleMarginTop = getDeviceStyle(2, 3);

    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.subText, subTextStyles, {marginTop: subTitleMarginTop, color: Color.grayColor}]}>{ scorecard.facility_code }: </Text>
        <Text style={[{fontSize: getDeviceStyle(16, 15), marginTop: 0}]}>{ scorecard.uuid } </Text>
        <Text style={[styles.subText, subTextStyles, {marginTop: subTitleMarginTop, color: Color.grayColor}]}>
          ({this.context.translations.raisedIndicator}: {criteriasSize})
        </Text>

        { this.renderConductedDate(scorecard) }
      </View>
    )
  }
}

export default ScorecardListInfoScorecardDetial;