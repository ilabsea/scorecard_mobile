import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { LocalizationContext } from '../Translations';
import ScorecardResultModalListItem from './ScorecardResultModalListItem';
import { containerPadding } from '../../utils/responsive_util';

class ScorecardResultModalList extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
  }

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
          scrollTo={(position) => this.scrollViewRef.scrollTo({ y: position, animated: true })}
        />
      )
    });
  }

  render() {
    return (
      <ScrollView ref={ref => this.scrollViewRef = ref} contentContainerStyle={{padding: containerPadding, paddingTop: 0, paddingBottom: this.props.isScorecardFinished ? 30 : 290}}
        showsVerticalScrollIndicator={false}
      >
        { this.renderForm() }
      </ScrollView>
    )
  }
}

export default ScorecardResultModalList;