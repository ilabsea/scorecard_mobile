import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { LocalizationContext } from '../Translations';
import ScorecardResultModalListItem from './ScorecardResultModalListItem';
import { containerPadding } from '../../utils/responsive_util';

class ScorecardResultModalList extends Component {
  static contextType = LocalizationContext;

  renderForm() {
    let renderPoints = this.props.hasAction ? this.props.points : this.props.defaultPoints;

    return renderPoints.map((note, index) => {
      let fieldName = `note-${index}`;

      return (
        <ScorecardResultModalListItem
          key={index}
          index={index}
          note={note}
          fieldName={fieldName}
          isScorecardFinished={this.props.isScorecardFinished}
          indicator={this.props.indicator}
          isDelete={this.props.isDelete}
          renderSelectedActions={this.props.renderSelectedActions}
          toggleCheckbox={this.props.toggleCheckbox}
          onChangeText={this.props.onChangeText}
          deletePoint={this.props.deletePoint}
        />
      )
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{padding: containerPadding, paddingTop: 0, paddingBottom: 30}}
        showsVerticalScrollIndicator={false}
      >
        <Pressable>{ this.renderForm() }</Pressable>
      </ScrollView>
    )
  }
}

export default ScorecardResultModalList;