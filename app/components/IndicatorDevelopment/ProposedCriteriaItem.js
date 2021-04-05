import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { LocalizationContext } from '../Translations';
import indicatorHelper from '../../helpers/indicator_helper';
import itemStyles from '../../themes/scorecardListItemStyle';
import Color from '../../themes/color';
import Scorecard from '../../models/Scorecard';

import CriteriaTitle from './CriteriaTitle';
import CriteriaImage from './CriteriaImage';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getDeviceStyle, isShortScreenDevice } from '../../utils/responsive_util';

class ProposedCriteriaItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard = Scorecard.find(props.criteria.scorecard_uuid);

    this.state = {
      indicator: indicatorHelper.getDisplayIndicator(props.criteria, scorecard),
      active: false
    };
  }

  renderShortcutLabel() {
    let activeStyle = this.state.active ? { backgroundColor: Color.headerColor } : {};
    const { indicator } = this.state;

    return (
      <CriteriaImage
        indicator={indicator}
        customStyle={styles.statusIconWrapper}
        activeStyle={activeStyle}
        width='99%'
        height='99%'
      />
    )
  }

  handleSelected() {
    let state = !this.state.active;
    let action = state ? 'add' : 'remove';

    if (action == 'add' && this.props.selectedAmount >= this.props.maximumCriteriaAmount) {
      return;
    }

    this.setState({active: state});
    !!this.props.onPress && this.props.onPress(this.props.criteria, action);
  }

  getListItemHeight = () => {
    const mobileHeight = isShortScreenDevice() ? hp('15%') : hp('13%');

    return getDeviceStyle(95, mobileHeight);
  }

  render() {
    const { translations } = this.context;
    const getBorderColor = this.state.active ? Color.headerColor : '#ccc';
    const getBorderWidth = this.state.active ? 2 : 1;

    return (
      <TouchableOpacity
        onPress={ () => this.handleSelected() }
        style={[itemStyles.listItem, { borderWidth: getBorderWidth, borderColor: getBorderColor, height: this.getListItemHeight()}]}>

        <CriteriaTitle
          title={this.state.indicator.content}
          subText={translations.raisedTimes}
          criteriaCount={this.props.criteria.count}
          indicator={this.state.indicator}
          customContainerStyle={[itemStyles.contentWrapper, {paddingLeft: 10}]}
          customSubTextStyle={{marginTop: -5}}
        />
      </TouchableOpacity>
    )
  }
}

ProposedCriteriaItem.defaultProps = {
  criteria: { tag: 'Dumi', count: 1 },
  onPress: {}
};

export default ProposedCriteriaItem;

const styles = StyleSheet.create({
  statusIconWrapper: {
    backgroundColor: '#d0cdcd',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    maxWidth: 95,
  },
})
