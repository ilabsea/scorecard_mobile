import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base';
import Color from '../../themes/color';
import CustomStyle from '../../themes/customStyle';
import { LocalizationContext } from '../Translations';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

import { getDeviceStyle } from '../../utils/responsive_util';
import MilestoneCardTabletStyles from './styles/tablet/MilestoneCardStyle';
import MilestoneCardMobileStyles from './styles/mobile/MilestoneCardStyle';

import { SCORECARD_RESULT } from '../../constants/scorecard_step_constant';

const responsiveStyles = getDeviceStyle(MilestoneCardTabletStyles, MilestoneCardMobileStyles);

export default class MilestoneCard extends Component {
  static contextType = LocalizationContext;

  _renderCard() {
    const { translations } = this.context;
    const { index, onPress } = this.props;
    let isDone = this._isDone();
    let isDisabled = this._isDisabled();
    let cardStyle = isDisabled ? { backgroundColor: Color.disableCardColor } : {};
    let labelStyle = isDisabled ? { color: '#626262' } : {};
    let titleStyle = isDone ? { color: '#626262', textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {};

    if (index == this.props.progressIndex && !this.props.isScorecardFinished) {
      titleStyle = { color: '#000', fontFamily: FontFamily.title };
    }

    return (
      <TouchableOpacity
        onPress={ () => !isDisabled && onPress()}
        style={[CustomStyle.card, responsiveStyles.card, cardStyle]}>

        <View style={responsiveStyles.cardTitleContainer}>
          <Text style={[responsiveStyles.cardTitle, titleStyle]}>{this.props.title}</Text>
          { (index < this.props.progressIndex && !!this.props.subTitle) &&
            <Text style={[responsiveStyles.cardSubTitle, labelStyle]}>{this.props.subTitle}</Text>
          }
        </View>

        { (index < this.props.progressIndex || this.props.isScorecardFinished) &&
          <View style={styles.viewDetail}>
            <Text style={[responsiveStyles.viewDetailText, labelStyle]}>{translations['viewDetail']}</Text>
            <Icon name='chevron-forward-outline' style={[responsiveStyles.viewDetailIcon, labelStyle]} />
          </View>
        }

        { (index == this.props.progressIndex && !this.props.isScorecardFinished) &&
          <View style={responsiveStyles.btnResume}>
            <Text style={responsiveStyles.btnResumeText}>{translations['resume']}</Text>
          </View>
        }
      </TouchableOpacity>
    );
  }

  _isDisabled() {
    if (this.props.isScorecardUploaded)
      return true;
    else if (this.props.isScorecardFinished)
      return this.props.index == SCORECARD_RESULT ? false : true;

    return this._isDone() ? false : true;
  }

  _isDone() {
    return this.props.progressIndex >= this.props.index;
  }

  _isPhaseFinished() {
    if (this.props.isScorecardFinished)
      return true;

    return this.props.progressIndex > this.props.index;
  }

  _renderBadge() {
    let isPhaseFinished = this._isPhaseFinished();
    let badgeIconStyle = isPhaseFinished ? { backgroundColor: Color.headerColor } : {};
    let badgeIcon = isPhaseFinished ? <Icon name='checkmark' style={responsiveStyles.badgeIcon} /> : <Text style={responsiveStyles.badgeText}>{this.props.index}</Text>

    return (
      <View style={[responsiveStyles.badgeIconContainer, badgeIconStyle]}>
        { badgeIcon }
      </View>
    )
  }

  render() {
    return (
      <View style={styles.itemWrapper}>
        { this._renderBadge() }
        { this._renderCard() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
  viewDetail: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
});
