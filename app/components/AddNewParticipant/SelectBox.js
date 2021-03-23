import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import participantHelper from '../../helpers/participant_helper';

import {
  mdTabletContainerSize,
  smTabletContainerSize,
  mdTabletLabelSize,
  smTabletLabelSize,
  mdTabletCheckIconSize,
  smTabletCheckIconSize,
} from './styles/tablet/SelectBoxStyle';
import {
  mdMobileContainerSize,
  smMobileContainerSize,
  mdMobileLabelSize,
  smMobileLabelSize,
  mdMobileCheckIconSize,
  smMobileCheckIconSize,
} from './styles/mobile/SelectBoxStyle';

import { getDeviceStyle } from '../../utils/responsive_util';

const mdContainerSize = getDeviceStyle(mdTabletContainerSize, mdMobileContainerSize);
const smContainerSize = getDeviceStyle(smTabletContainerSize, smMobileContainerSize);
const mdLabelSize = getDeviceStyle(mdTabletLabelSize, mdMobileLabelSize);
const smLabelSize = getDeviceStyle(smTabletLabelSize, smMobileLabelSize);
const mdCheckIconSize = getDeviceStyle(mdTabletCheckIconSize, mdMobileCheckIconSize);
const smCheckIconSize = getDeviceStyle(smTabletCheckIconSize, smMobileCheckIconSize);

class SelectBox extends Component {
  static contextType = LocalizationContext;

  _renderCheckIcon = () => {
    if (this.props.isSelected) {
      const iconSize = this.props.renderSmallSize ? smCheckIconSize : mdCheckIconSize;
      const topPosition = this.props.renderSmallSize ? -5 : getDeviceStyle(-10, 0);

      return (
        <MaterialIcon name='check' size={iconSize} color={Color.headerColor}
          style={{position: 'absolute', top: topPosition, right: 0, zIndex: 10}}
        />
      )
    }
  }

  getColor = (type) => {
    return participantHelper.getItemColor(this.props.isSelected, type);
  }

  render() {
    const containerSize = this.props.renderSmallSize ? smContainerSize : mdContainerSize;
    const labelSize = this.props.renderSmallSize ? smLabelSize : mdLabelSize;

    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[styles.container, { borderColor: this.getColor('border'), width: containerSize, height: containerSize }]}
      >
        { this._renderCheckIcon() }
        { this.props.children }
        <Text style={{ color: this.getColor('text'), marginTop: 5, textAlign: 'center', fontSize: labelSize }}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ebebeb',
    borderRadius: 10,
  }
});

export default SelectBox;