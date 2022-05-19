import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon, CheckBox } from 'native-base';
import { Divider } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import ScorecardResultTextInput from './ScorecardResultTextInput';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import FormModalTabletStyles from '../../styles/tablet/FormModalComponentStyle';
import FormModalMobileStyles from '../../styles/mobile/FormModalComponentStyle';

const styles = getDeviceStyle(FormModalTabletStyles, FormModalMobileStyles);

class ScorecardResultModalListItem extends Component {
  static contextType = LocalizationContext;

  isSuggestedAction() {
    return this.props.indicator.currentFieldName == 'suggested_action';
  }

  getLabelMarginTop() {
    return { marginTop: this.props.isScorecardFinished ? -2 : 0 };
  }

  render() {
    const { index, note, fieldName, isScorecardFinished, indicator, isDelete } = this.props;

    return (
      <React.Fragment>
        <View style={[{flexDirection: 'row', flex: 1, width: '100%', alignItems: 'center', marginTop: 5}, isScorecardFinished ? {height: 40} : {}]}>
          { this.isSuggestedAction() &&
            <CheckBox
              disabled={isScorecardFinished}
              checked={this.props.renderSelectedActions[index]}
              onPress={() => this.props.toggleCheckbox(index)}
              color={isScorecardFinished ? Color.grayColor : Color.clickableColor}
              style={{marginLeft: -10, marginRight: 15, alignItems: 'center', justifyContent: 'flex-start', width: 23, height: 23}}
            />
          }

          <Text style={[styles.orderNumberText, this.isSuggestedAction() ? {marginLeft: 5} : {}]}>{ index + 1 }.</Text>
          <View style={{flex: 1}}>
            <ScorecardResultTextInput
              autoFocus={!note}
              value={note}
              placeholder={this.context.translations[indicator.currentFieldName]}
              fieldName={fieldName}
              onChangeText={this.props.onChangeText}
              customStyle={styles.inputText}
              disabled={isScorecardFinished}
              isDelete={isDelete}
            />
          </View>

          <TouchableOpacity
            onPress={() => this.props.deletePoint(index)}
            style={styles.btnRemove}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Icon name='trash' type="FontAwesome" style={[styles.removeIcon, this.getLabelMarginTop(), { color: isScorecardFinished ? Color.lightGrayColor : 'red' }]} />
          </TouchableOpacity>
        </View>

        { isScorecardFinished && <Divider style={{backgroundColor: '#b3b3b3', flex: 1, marginTop: getDeviceStyle(14, 5), marginBottom: getDeviceStyle(8, 0)}}/> }
      </React.Fragment>
    )
  }
}

export default ScorecardResultModalListItem;