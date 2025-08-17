import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import OutlinedButton from '../OutlinedButton';

import { getDeviceStyle } from '../../utils/responsive_util';
import EmptyListActionTabletStyles from '../../styles/tablet/EmptyListActionComponentStyle';
import EmptyListActionMobileStyles from '../../styles/mobile/EmptyListActionComponentStyle';

const responsiveStyles = getDeviceStyle(EmptyListActionTabletStyles, EmptyListActionMobileStyles);

class EmptyListAction extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.customContainerStyle]}>
        <View style={[responsiveStyles.messageContainer, this.props.contentContainerStyle]}>
          <Icon name={'document-text-outline'} style={responsiveStyles.icon} />
          <Text style={responsiveStyles.label}>{this.props.title}</Text>
          { !this.props.hideButton &&
            <View>
              <OutlinedButton
                icon={ this.props.icon || 'add-outline' }
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

export default EmptyListAction;