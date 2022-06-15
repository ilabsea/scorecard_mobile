import React from 'react';
import { StyleSheet } from 'react-native';

import GenderIcon from './GenderIcon';
import Color from '../../themes/color';
import { mediumIconSize, mediumTransgenderIconSize } from '../../utils/font_size_util';;

class ListItemGenderIcon extends React.Component {
  render() {
    return <GenderIcon gender={this.props.gender}
              size={mediumIconSize()}
              color={Color.blackColor}
              transgenderIconSize={mediumTransgenderIconSize()}
              containerStyle={styles.container}
              transgenderContainerStyle={this.props.transgenderContainerStyle}
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