import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
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

class SelectedCriteriaItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    let scorecard = scorecardService.find(props.criteria.scorecard_uuid);

    this.state = {
      indicator: getDisplayIndicator(props.criteria, scorecard)
    };
  }

  renderShortcutLabel() {
    return (
      <View style={[styles.statusIconWrapper, {backgroundColor: '#d0cdcd'}]}>
        <Text style={{fontSize: 60, color: '#787878', fontFamily: FontFamily.title}}>{this.state.indicator.content[0]}</Text>
      </View>
    )
  }

  handleCriteria() {
    this.props.removeFromSelected(this.props.criteria);
    this.props.addToProposed(this.props.criteria);
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={[styles.listItem, styles.card]}>
        { this.renderShortcutLabel() }

        <View style={styles.contentWrapper}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.title} numberOfLines={1}>{this.state.indicator.content}</Text>
              <Text style={styles.subText}>{translations.raisedTimes}: ({this.props.criteria.count})</Text>
            </View>

            <View style={{paddingRight: 16}}>
              <PlaySound filePath={this.state.indicator.local_audio} />
            </View>
          </View>

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
