import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import OutlinedButton from './OutlinedButton';

import { getDeviceStyle } from '../utils/responsive_util';
import NoDataMessageTabletStyles from '../styles/tablet/NoDataMessageComponentStyle';
import NoDataMessageMobileStyles from '../styles/mobile/NoDataMessageComponentStyle';

const responsiveStyles = getDeviceStyle(NoDataMessageTabletStyles, NoDataMessageMobileStyles);

class NoDataMessage extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.customContainerStyle]}>
        <View style={[responsiveStyles.messageContainer, this.props.contentContainerStyle]}>
          <Icon name={'document-outline'} style={responsiveStyles.icon} />
          <Text style={responsiveStyles.label}>{this.props.title}</Text>
          { !this.props.hideButton &&
            <View>
              <OutlinedButton
                icon={ this.props.icon || 'plus' }
                label={this.props.buttonLabel}
                onPress={() => this.props.onPress() }
              />
            </View>
          }
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