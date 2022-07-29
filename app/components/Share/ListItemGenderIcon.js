import React from 'react';
import { StyleSheet } from 'react-native';

import GenderIcon from './GenderIcon';
import Color from '../../themes/color';
import { mediumIconSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class ListItemGenderIcon extends React.Component {
  render() {
    return <GenderIcon gender={this.props.gender}
              color={ this.props.color || Color.blackColor}
              size={mediumIconSize()}
              otherIconSize={mediumIconSize() - 6}
              containerStyle={[styles.container, this.props.customGenderStyle]}
              questionIconStyle={{ top: getDeviceStyle(-10, -9), left: -2 }}
            />
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    marginRight: -5,
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ListItemGenderIcon;