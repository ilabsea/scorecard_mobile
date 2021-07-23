import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import AppIcon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../components/Translations';
import Color from '../themes/color';
import uuidV4 from '../utils/uuidv4';
import styles from '../themes/scorecardListItemStyle';
import votingCriteriaService from '../services/votingCriteriaService';
import scorecardHelper from '../helpers/scorecard_helper';

import { getDeviceStyle } from '../utils/responsive_util';
import ScorecardItemTabletStyles from '../styles/tablet/ScorecardItemComponentStyle';
import ScorecardItemMobileStyles from '../styles/mobile/ScorecardItemComponentStyle';
import { FontFamily } from '../assets/stylesheets/theme/font';

const responsiveStyles = getDeviceStyle(ScorecardItemTabletStyles, ScorecardItemMobileStyles);

export default class ScorecardItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.itemRef = null;
  }

  renderStatusIcon(scorecard) {
    const icon = scorecardHelper.getStatusIcon(scorecard);

    return (
      <View style={{borderWidth: 1.2, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderColor: scorecardHelper.scorecardTypeColor(scorecard)}}>
        <AppIcon name={icon} size={20} color={scorecardHelper.iconColor(scorecard)} />
      </View>
    )
  }

  deleteScorecard = () => {
    this.props.showDeleteModal();
    this.itemRef.close();
  }

  renderDeleteAction = () => {
    const { translations } = this.context;

    return (
      <RectButton
        onPress={() => this.deleteScorecard()}
        style={responsiveStyles.deleteContainer}
      >
        <Text style={[{color: Color.whiteColor}, responsiveStyles.deleteLabel]}>{ translations.delete }</Text>
      </RectButton>
    )
  }

  conductedDate(scorecard) {
    const { appLanguage } = this.context;

    if (!scorecard.conducted_date)
      return '';

    return scorecardHelper.getTranslatedDate(scorecard.conducted_date, appLanguage, 'MMM DD');
  }

  render() {
    const { translations, appLanguage } = this.context;
    let scorecard = this.props.scorecard || {};
    let criteriasSize = votingCriteriaService.getAll(scorecard.uuid).length;
    const subTextStyles = { paddingTop: getDeviceStyle(2, 1), height: getDeviceStyle(27, 23) };

    return (

      <Swipeable
        ref={ref => { this.itemRef = ref }}
        key={uuidV4()}
        enabled={!scorecard.isUploaded}
        renderRightActions={this.renderDeleteAction}
      >
        <TouchableOpacity onPress={this.props.onPress}
          style={responsiveStyles.itemContainer}
        >
          {this.renderStatusIcon(scorecard)}

          <View style={{flex: 1, marginLeft: 15}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[{fontSize: 14, flex: 1}]}>{ scorecard.uuid }</Text>
              <Text style={[styles.subText, subTextStyles, {marginTop: 2}]}>{translations.numberOfCriteria}: {criteriasSize}</Text>
            </View>

            <View style={{flexDirection: 'row', paddingRight: 10, alignItems: 'center', marginTop: getDeviceStyle(-4, 0)}}>
              <AppIcon name='map-marker' size={14} color={Color.grayColor} style={{marginRight: 5, marginTop: -4}} />
              <View style={{flex: 3, borderWidth: 0, flexDirection: 'row'}}>
                {/* <Text numberOfLines={1} style={[styles.subText, { marginLeft: 0, color: Color.grayColor}]}>{scorecard.province} {scorecard.district} {scorecard.commune}</Text> */}


                <Text style={[styles.subText, { marginLeft: 0, color: Color.grayColor, marginRight: 0}]}>{scorecard.province}</Text>
                <Text numberOfLines={1} style={[styles.subText, {width: wp('10%'), margin: 0, color: Color.grayColor, borderWidth: 0, marginRight: 0 }]}>{scorecard.district}</Text>
                <Text style={[styles.subText, { margin: 0, color: Color.grayColor, marginLeft: 2}]}>{scorecard.district}</Text>
              </View>

              {/* <Text style={[styles.subText, { flex: 1, borderWidth: 1, textAlign: 'right' }]}>{ this.conductedDate(scorecard) }</Text> */}
            </View>

            { scorecard.isUploaded &&
              <Text style={{ fontSize: getDeviceStyle(12, 10), color: Color.redColor, fontFamily: FontFamily.title}}>
                {translations.toBeRemovedOn}: { scorecardHelper.getTranslatedRemoveDate(scorecard.uploaded_date, appLanguage) }
              </Text>
            }
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }
}