import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PlaySound from '../VotingCriteria/PlaySound';
import { LocalizationContext } from '../Translations';

import Color from '../../themes/color';
import styles from '../../themes/scorecardListItemStyle';
import { getPluralOrSingularWord } from '../../utils/translation_util';

class IndicatorTitle extends Component {
  static contextType = LocalizationContext;

  renderIndicatorTitleContent() {
    const {translations, appLanguage} = this.context;
    const order = (this.props.order || this.props.order == 0) ? `${this.props.order + 1}. ` : '';

    return (
      <View style={{flexDirection: 'row'}}>
        { this.props.isDraggable &&
          <View style={{width: 20, marginLeft: -10, paddingTop: 5}}>
            <Icon name="more-vert" style={{color: Color.lightGrayColor, fontSize: 20, textAlign: 'center'}} />
          </View>
        }

        <View>
          <Text style={[styles.title, this.props.customTitleStyle]} numberOfLines={2}>{ order }{this.props.title}</Text>
          <Text style={[styles.subText, this.props.customSubTextStyle]}>
            {this.props.subText}: ({this.props.indicatorCount} { getPluralOrSingularWord(this.props.indicatorCount, translations.time, appLanguage, 's') })
          </Text>
        </View>
      </View>
    )
  }

  renderIndicatorTitle() {
    const containerStyles = {flex: 1, paddingRight: 20, justifyContent: 'center'};

    if (this.props.isDraggable) {
      return (
        <TouchableOpacity onLongPress={() => this.props.onLongPress()} style={containerStyles}>
          { this.renderIndicatorTitleContent() }
        </TouchableOpacity>
      );
    }

    return ( <View style={containerStyles}>{ this.renderIndicatorTitleContent() }</View> );
  }

  render() {
    return (
      <View style={[this.props.customContainerStyle, {flexDirection: 'row', justifyContent: 'center'}]}>
        { this.renderIndicatorTitle() }

        <View style={[{paddingRight: 10}, this.props.customAudioContainerStyle]}>
          <PlaySound filePath={this.props.indicator.local_audio}/>
        </View>
      </View>
    );
  }
}

export default IndicatorTitle;