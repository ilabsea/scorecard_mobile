import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import ScorecardResultIndicatorCell from './ScorecardResultIndicatorCell';
import ScorecardResultEditButton from './ScorecardResultEditButton';
import ScorecardResultAddButton from './ScorecardResultAddButton';

import { TableWrapper, Cell } from 'react-native-table-component';
import indicatorHelper from '../../helpers/indicator_helper';
import { bodyFontSize } from '../../utils/font_size_util';

export default class ScorecardResultTableRow extends Component {
  static contextType = LocalizationContext;

  onPress = (fieldName, indicator, isAddNew) => {
    if (!this.props.indicator.median|| (isAddNew && this.props.isScorecardFinished))
      return;

    !!this.props.onPress && this.props.onPress(fieldName, indicator);
  }

  btnAdd = (fieldName, indicator) => {
    return <ScorecardResultAddButton
              fieldName={fieldName}
              indicator={this.props.indicator}
              isScorecardFinished={this.props.isScorecardFinished}
              onPress={() => this.onPress(fieldName, indicator, true)}
           />
  }

  renderEditText = (fieldName, indicator) => {
    return <ScorecardResultEditButton
              onPress={() => this.onPress(fieldName, indicator, false)}
              fieldName={fieldName}
              indicator={this.props.indicator}
           />
  }

  renderCell = (fieldName, indicator) => {
    if (!this.props.indicator[fieldName]) {
      return this.btnAdd(fieldName, indicator);
    }

    return this.renderEditText(fieldName, indicator);
  }

  _renderIndicator = (text, flexNum) => {
    const label = <ScorecardResultIndicatorCell order={this.props.order}
                    indicatorName={text} scorecardUuid={this.props.scorecardUuid}
                    indicatorableId={this.props.indicator.indicatorable_id}
                  />
    return <Cell data={label} style={{flex: flexNum}}/>
  };

  _renderMedian = () => {
    const textLabel = this.props.indicator.median ? this.props.indicator.median : this.context.translations.notVoted;
    return <Cell data={textLabel} style={{flex: 2, alignItems: 'center'}} textStyle={!this.props.indicator.median ? { fontSize: 14, color: Color.redColor } : {fontSize: bodyFontSize()}} />
  }

  render() {
    const editableFields = ['strength',  'weakness', 'suggested_action'];
    const languageIndicator = indicatorHelper.getDisplayIndicator(this.props.indicator);

    return (
      <TableWrapper style={styles.row} borderStyle={{borderColor: Color.listItemBorderColor, borderWidth: 1}}>
        { this._renderIndicator(languageIndicator.content, 4) }
        { this._renderMedian() }
        { editableFields.map((fieldName, index) => (
          <Cell key={index} data={this.renderCell(fieldName, languageIndicator)} style={{flex: 3}}/>
        ))}
      </TableWrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    minHeight: 80,
    backgroundColor: Color.whiteColor
  }
});