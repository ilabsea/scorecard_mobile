import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import { LocalizationContext } from '../Translations';
import ScorecardResultModalListItem from './ScorecardResultModalListItem';

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
          criteria={this.props.criteria}
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
      <ScrollView contentContainerStyle={{paddingTop: 0, paddingBottom: 20}} showsVerticalScrollIndicator={false}>
        { this.renderForm() }
      </ScrollView>
    )
  }
}

export default ScorecardResultModalList;