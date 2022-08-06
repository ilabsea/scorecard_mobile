import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import IndicatorRaisedParticipants from '../Share/IndicatorRaisedParticipants';
import Color from '../../themes/color';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';
import indicatorHelper from '../../helpers/indicator_helper';

class ScorecardResultAccordionTitle extends Component {
  render() {
    const indicator = indicatorHelper.getDisplayIndicator(this.props.indicator);
    const indicatorName = indicator.content || indicator.name;
    const textColor = this.props.isRequired ? { color: Color.redColor } : { color: Color.blackColor };

    return (
      <View style={{width: wp('70%')}}>
        <View style={{flexDirection: 'row'}}>
          <Text numberOfLines={1} style={styles.titleText}>{this.props.order}. { indicatorName }</Text>
          <Text style={[styles.titleText, textColor]}> *</Text>
        </View>

        <IndicatorRaisedParticipants scorecardUuid={this.props.scorecardUuid} indicatorableId={this.props.indicator.indicatorable_id}
          containerStyle={{ marginTop: 4, marginLeft: 16 }}
        />
      </View>
    )
  }
}

export default ScorecardResultAccordionTitle;