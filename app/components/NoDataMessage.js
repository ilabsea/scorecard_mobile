import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import OutlinedButton from './OutlinedButton';


class NoDataMessage extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.customContainerStyle]}>
        <Icon name={'document-outline'} style={{fontSize: 100, color: "#e1e0e1"}} />
        <Text style={{fontSize: 24, marginVertical: 10}}>{this.props.title}</Text>
        <View>
          <OutlinedButton
            icon="plus"
            label={this.props.buttonLabel}
            onPress={() => this.props.onPress() }
          />
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