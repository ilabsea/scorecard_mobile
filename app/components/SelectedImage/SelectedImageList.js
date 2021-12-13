import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Color from '../../themes/color';

const boxSize = wp('28.2%');

class SelectedImageList extends Component {

  renderImageItem(item, index) {
    const isSelected = this.props.isSelected(item.image_path);

    return (
      <TouchableOpacity onPress={() => this.props.toggleSelectImage(item.image_path)} key={index}
        style={[styles.container, isSelected ? {borderColor: Color.clickableColor} : {}]}
      >
        { isSelected &&
          <View style={{backgroundColor: Color.clickableColor, position: 'absolute', right: 0, top: 0, zIndex: 10, borderRadius: 60, height: 20, width: 20, justifyContent: 'center'}}>
            <MaterialIcon name='check' size={20} color={Color.whiteColor} />
          </View>
        }

        <Image
          source={{uri: item.image_path}}
          style={{width: boxSize, height: boxSize, borderRadius: 4}}
        />
      </TouchableOpacity>
    )
  }

  renderAddButton() {
    return (
      <TouchableOpacity onPress={() => this.props.openImagePicker()}
        style={[styles.container, { width: boxSize, height: boxSize, justifyContent: 'center', alignItems: 'center' }]}
      >
        <MaterialIcon name='add' size={60} color={Color.clickableColor} />
      </TouchableOpacity>
    )
  }

  renderImages() {
    return this.props.scorecardImages.map((item, index) => {
      return this.renderImageItem(item, index)
    });
  }

  render() {
    return (
      <React.Fragment>
        { this.renderImages() }
        { this.renderAddButton() }
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#b5b5b5',
    marginHorizontal: 4,
    marginVertical: 5,
    borderRadius: 4,
  }
});

export default SelectedImageList;