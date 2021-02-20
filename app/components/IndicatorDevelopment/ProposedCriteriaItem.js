import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';

import { Icon } from 'native-base';
import { Button } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { getDisplayIndicator } from '../../services/indicator_service';
import itemStyles from '../../themes/scorecardListItemStyle';
import PlaySound from '../VotingCriteria/PlaySound';
import Color from '../../themes/color';
import CustomStyle from '../../themes/customStyle';
import ScorecardService from '../../services/scorecardService';

import CriteriaTitle from './CriteriaTitle';
import CriteriaImage from './CriteriaImage';

class ProposedCriteriaItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    const scorecardService = new ScorecardService();
    let scorecard = scorecardService.find(props.criteria.scorecard_uuid);

    this.state = {
      indicator: getDisplayIndicator(props.criteria, scorecard),
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

  render() {
    const { translations } = this.context;
    const getBorderColor = this.state.active ? Color.headerColor : '#ccc';
    const getBorderWidth = this.state.active ? 2 : 1;

    return (
      <TouchableOpacity
        onPress={ () => this.handleSelected() }
        style={[itemStyles.listItem, { borderWidth: getBorderWidth, borderColor: getBorderColor, height: 95}]}>

        { this.renderShortcutLabel() }

        <CriteriaTitle
          title={this.state.indicator.content}
          subText={translations.raisedTimes}
          criteriaCount={this.props.criteria.count}
          indicator={this.state.indicator}
          customContainerStyle={itemStyles.contentWrapper}
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
