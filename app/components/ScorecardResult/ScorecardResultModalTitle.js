import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';

import { getDeviceStyle } from '../../utils/responsive_util';
import FormModalTabletStyles from '../../styles/tablet/FormModalComponentStyle';
import FormModalMobileStyles from '../../styles/mobile/FormModalComponentStyle';

const styles = getDeviceStyle(FormModalTabletStyles, FormModalMobileStyles);

class ScorecardResultModalTitle extends Component {
  static contextType = LocalizationContext;

  renderIndicatorName() {
    if (this.props.selectedIndicator)
      return this.props.selectedIndicator.content ? this.props.selectedIndicator.content : this.props.selectedIndicator.name;

    return '';
  }

  render() {
    const { translations } = this.context;
    const fieldName = translations[this.props.criteria.currentFieldName] ? translations[this.props.criteria.currentFieldName].toLowerCase() : '';
    const subTitle = `${translations.insert} ${fieldName}`;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.titleText}>
            { this.renderIndicatorName() }
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.subTitleText}>{ subTitle }</Text>
          </View>
        </View>

        { !this.props.isScorecardFinished &&
          <OutlinedButton
            icon='plus'
            label={ translations.addNew }
            onPress={() => this.props.addNewPoint() }
            disabled={this.props.isScorecardFinished}
          />
        }
      </View>
    )
  }
}

export default ScorecardResultModalTitle;