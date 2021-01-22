import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';

import styles from '../../themes/scorecardListItemStyle';

class CriteriaImage extends Component {
  render() {
    const { indicator, width, height } = this.props;

    return (
      <View style={[
        styles.statusIconWrapper,
        this.props.customStyle,
        this.props.activeStyle,
        !!indicator.local_image ? {backgroundColor: 'transparent'} : {backgroundColor: '#d0cdcd'}
      ]}>
        { !!indicator.local_image &&
          <ImageBackground source={{uri: `file://${indicator.local_image}`}} style={{width: width, height: height}} resizeMode='contain' />
        }
      </View>
    );
  }
}

export default CriteriaImage;