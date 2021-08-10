import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { removeFromSelected } from '../../actions/selectedCriteriaAction';
import { addToProposed } from '../../actions/proposedCriteriaAction';

import { LocalizationContext } from '../Translations';
import styles from '../../themes/scorecardListItemStyle';

import indicatorHelper from '../../helpers/indicator_helper';
import Scorecard from '../../models/Scorecard';

import CriteriaTitle from './CriteriaTitle';

import { getDeviceStyle } from '../../utils/responsive_util';
import SelectedCriteriaItemTabletStyles from '../../styles/tablet/SelectedCriteriaItemComponentStyle';
import SelectedCriteriaItemMobileStyles from '../../styles/mobile/SelectedCriteriaItemComponentStyle';

const responsiveStyles = getDeviceStyle(SelectedCriteriaItemTabletStyles, SelectedCriteriaItemMobileStyles);

class SelectedCriteriaItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.scorecard = Scorecard.find(props.criteria.scorecard_uuid);

    this.state = {
      indicator: indicatorHelper.getDisplayIndicator(props.criteria, this.scorecard),
      scorecard: this.scorecard,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { indicator: indicatorHelper.getDisplayIndicator(props.criteria, state.scorecard) };
  }

  handleCriteria() {
    this.props.removeFromSelected(this.props.criteria);
    this.props.addToProposed(this.props.criteria);
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={[styles.listItem, styles.card, responsiveStyles.itemContainer]}>
        <View style={[styles.contentWrapper, {paddingLeft: 0, flexDirection: 'column', paddingTop: 0}]}>

          <CriteriaTitle
            title={this.state.indicator.content}
            subText={translations.raisedTimes}
            criteriaCount={this.props.criteria.count}
            indicator={this.state.indicator}
            customContainerStyle={responsiveStyles.container}
            customTitleStyle={responsiveStyles.titleText}
            customSubTextStyle={responsiveStyles.subText}
            customAudioContainerStyle={{justifyContent: 'center'}}
          />

          <View style={[styles.viewDetail, responsiveStyles.viewDetailContainer]}>
            <Button color='red' icon="trash-can-outline" mode="text" onPress={() => this.handleCriteria()}
              labelStyle={[styles.buttonLabel, { marginTop: getDeviceStyle(6, 8) }]} style={{height: 40}}
            >
              { translations['remove'] }
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

SelectedCriteriaItem.defaultProps = {
  criteria: { tag: 'Dumi', count: 1 },
  onPress: {}
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromSelected: (criteria) => dispatch(removeFromSelected(criteria)),
    addToProposed: (criteria) => dispatch(addToProposed(criteria)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedCriteriaItem);
