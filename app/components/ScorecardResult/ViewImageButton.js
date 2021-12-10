import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { navigate } from '../../navigators/app_navigator';
import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import OutlinedButton from '../OutlinedButton';

class ViewImageButton extends Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View style={{position: 'relative'}}>
        <OutlinedButton
          icon="image"
          label={this.context.translations.viewImage}
          onPress={() => navigate('SelectedImage', { scorecard_uuid: this.props.scorecardUuid }) }
        />

        { this.props.scorecardReferences.length > 0 &&
          <View style={styles.badge}>
            <Text style={{color: Color.whiteColor}}>{ this.props.scorecardReferences.length }</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 11,
    backgroundColor: Color.clickableColor,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: -14
  }
});

function mapStateToProps(state) {
  return {
    scorecardReferences: state.scorecardReferences
  }
}

export default connect(
  mapStateToProps,
  null
)(ViewImageButton);