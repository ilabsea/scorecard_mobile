import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../themes/color';
import BottomHalfModal from './BottomHalfModal';

const screenHeight = Dimensions.get('screen').height;

class ImagePicker extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     modalVisible: props.isVisible
  //   }
  // }

  openImagePicker() {

  }

  openCamera() {

  }

  render() {
    return (
      <BottomHalfModal
        isVisible={this.props.modalVisible}
        closeModal={() => this.props.closeModal()}
        modalContentStyle={{ height: screenHeight / 4.8 }}
      >
        <View>
          <TouchableOpacity onPress={() => this.openImagePicker()} style={[styles.button, { marginTop: 10 }]}>
            <View style={{width: 'auto', backgroundColor: Color.lightGrayColor, borderRadius: 40, padding: 6}}>
              <Icon name="image" size={22} color='black' />
            </View>
            <Text style={{marginLeft: 16, fontSize: 16, fontWeight: '600'}}>Upload image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openCamera()} style={styles.button}>
            <View style={{backgroundColor: Color.lightGrayColor, borderRadius: 40, padding: 5}}>
              <Icon name="camera-alt" size={22} color='black' />
            </View>
            <Text style={{marginLeft: 16, fontSize: 16, fontWeight: '600'}}>Take photo</Text>
          </TouchableOpacity>
        </View>
      </BottomHalfModal>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  }
});

export default ImagePicker;