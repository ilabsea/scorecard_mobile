import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../themes/color';
import CustomStyle from '../../themes/customStyle';
import { LocalizationContext } from '../Translations';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

import Scorecard from '../../models/Scorecard';
import { getDeviceStyle } from '../../utils/responsive_util';
import MilestoneCardTabletStyles from '../../styles/tablet/MilestoneCardComponentStyle';
import MilestoneCardMobileStyles from '../../styles/mobile/MilestoneCardComponentStyle';

const responsiveStyles = getDeviceStyle(MilestoneCardTabletStyles, MilestoneCardMobileStyles);

export default class MilestoneCard extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      isStepEditable: true,
      isStepDone: Scorecard.stepIsDone(props.scorecard, props.currentStep)
    }

    this.componentIsUnmount = false;
  }


  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.checkEditStatus();
    });
  }

  componentDidUpdate(prevProps) {
    if (!this.componentIsUnmount && prevProps.isScorecardEditable != this.props.isScorecardEditable)
      this.checkEditStatus();
  }

  componentWillUnmount() {
    this.focusListener && this.focusListener();
    this.componentIsUnmount = true;
  }

  async checkEditStatus() {
    this.setState({
      isStepDone: Scorecard.stepIsDone(this.props.scorecard, this.props.currentStep),
      isStepEditable: this.props.isScorecardEditable && await Scorecard.isStepEditable(this.props.scorecard, this.props.currentStep)
    })
  }

  _renderCard() {
    const { translations } = this.context;
    const { currentStep, onPress } = this.props;
    let cardStyle = !this.state.isStepEditable ? { backgroundColor: Color.disableCardColor } : {};
    let labelStyle = !this.state.isStepEditable ? { color: '#5b5b5b' } : {};
    let titleStyle = this.state.isStepDone ? { color: '#5b5b5b', textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {};
    const disabledTitleStyle = !this.state.isStepEditable ? { color: '#5b5b5b' } : {}

    if (currentStep == this.props.progressStep && !this.props.isScorecardFinished) {
      titleStyle = { color: Color.blackColor, fontFamily: FontFamily.title};
    }

    return (
      <TouchableOpacity
        onPress={ () => this.state.isStepEditable && onPress()}
        style={[CustomStyle.card, responsiveStyles.card, cardStyle]}>

        <View style={responsiveStyles.cardTitleContainer}>
          <Text style={[responsiveStyles.cardTitle, titleStyle, disabledTitleStyle]}>{this.props.title}</Text>
          { (currentStep < this.props.progressStep && !!this.props.subTitle) &&
            <Text style={[responsiveStyles.cardSubTitle, labelStyle]}>{this.props.subTitle}</Text>
          }
        </View>

        { (currentStep < this.props.progressStep || this.props.isScorecardFinished) &&
          <View style={styles.viewDetail}>
            <Text style={[responsiveStyles.viewDetailText, labelStyle]}>{translations['viewDetail']}</Text>
            <Icon name='chevron-forward-outline' style={[responsiveStyles.viewDetailIcon, labelStyle]} />
          </View>
        }

        { (currentStep == this.props.progressStep && !this.props.isScorecardFinished) &&
          <View style={[responsiveStyles.btnResume, !this.state.isStepEditable ? { backgroundColor: Color.grayColor } : {}]}>
            <Text style={responsiveStyles.btnResumeText}>{translations['resume']}</Text>
          </View>
        }
      </TouchableOpacity>
    );
  }

  _renderBadge() {
    let badgeIconStyle = this.state.isStepDone ? { backgroundColor: Color.headerColor } : {};
    let badgeIcon = this.state.isStepDone ? <Icon name='checkmark' style={responsiveStyles.badgeIcon} /> : <Text style={responsiveStyles.badgeText}>{this.props.currentStep}</Text>

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
