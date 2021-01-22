import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';

import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { removeFromSelected } from '../../actions/selectedCriteriaAction';
import { addToProposed } from '../../actions/proposedCriteriaAction';

import { LocalizationContext } from '../Translations';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import styles from '../../themes/scorecardListItemStyle';
import PlaySound from '../VotingCriteria/PlaySound';

import scorecardService from '../../services/scorecardService';
import { getDisplayIndicator } from '../../services/indicator_service';

import CustomStyle from '../../themes/customStyle';
import CriteriaTitle from './CriteriaTitle';
import CriteriaImage from './CriteriaImage';

class SelectedCriteriaItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    let scorecard = scorecardService.find(props.criteria.scorecard_uuid);

    this.state = {
      indicator: getDisplayIndicator(props.criteria, scorecard)
    };
  }

  renderImage() {
    const { indicator } = this.state;

    return (
      <CriteriaImage
        indicator={indicator}
        width='100%'
        height='100%'
      />
    )
  }

  handleCriteria() {
    this.props.removeFromSelected(this.props.criteria);
    this.props.addToProposed(this.props.criteria);
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={[styles.listItem, styles.card, {maxHeight: 130}]}>
        { this.renderImage() }

        <View style={styles.contentWrapper}>

          <CriteriaTitle
            title={this.state.indicator.content}
            subText={translations.raisedTimes}
            criteriaCount={this.props.criteria.count}
            indicator={this.state.indicator}
          />

          <View style={{flex: 1}}></View>

          <View style={styles.viewDetail}>
            <Button color='red' icon="trash-can-outline" mode="text" onPress={() => this.handleCriteria()}>
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
