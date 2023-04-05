import React from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

import SearchBox from '../../components/SearchBox/SearchBox';
import ProposeNewIndicatorSearchBox from '../../components/ProposeNewIndicator/ProposeNewIndicatorSearchBox';
import Color from '../../themes/color';
import { containerPadding } from '../../utils/responsive_util';

class ProposeNewIndicator extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flexGrow: 1, padding: containerPadding, paddingTop: 15}}>
          <ProposeNewIndicatorSearchBox scorecardUuid={this.props.route.params.scorecard_uuid} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ProposeNewIndicator