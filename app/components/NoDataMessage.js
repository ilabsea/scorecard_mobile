import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import OutlinedButton from './OutlinedButton';

import { getDeviceStyle } from '../utils/responsive_util';
import NoDataMessageTabletStyles from './styles/tablet/NoDataMessageStyle';
import NoDataMessageMobileStyles from './styles/mobile/NoDataMessageStyle';

const responsiveStyles = getDeviceStyle(NoDataMessageTabletStyles, NoDataMessageMobileStyles);

class NoDataMessage extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.customContainerStyle]}>
        <View style={responsiveStyles.messageContainer}>
          <Icon name={'document-outline'} style={responsiveStyles.icon} />
          <Text style={responsiveStyles.label}>{this.props.title}</Text>
          <View>
            <OutlinedButton
              icon="plus"
              label={this.props.buttonLabel}
              onPress={() => this.props.onPress() }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default NoDataMessage;