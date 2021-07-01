import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';

import Color from '../themes/color';
import BottomHalfModal from './BottomHalfModal';

const screenHeight = Dimensions.get('screen').height;

class ImageSelector extends Component {
  openImagePicker() {
    ImagePicker.openPicker({
      width: 640,
      height: 320,
      cropping: true,
      multiple: true,
      compressImageQuality: 0.8,
    }).then(images => {
      console.log('pick image success == ', images);
    })
    .catch(error => {
      console.log('select image error == ', error);
    })
  }

  checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': 'ការអនុញ្ញាតប្រើកាមេរ៉ា',
      'message': 'កម្មវិធីនេះ សុំសិទ្ធិចូលប្រើកាមេរ៉ារបស់អ្នក ដូច្នេះទើបអ្នកអាចថតរូបបាន។'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, rationale)
      .then(result => {
        console.log('permission result == ', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }

  openCamera() {
    this.checkPermission().then(hasPermission => {
      if (hasPermission) {
        ImagePicker.openCamera({
          width: 640,
          height: 320,
          mediaType: 'photo',
          compressImageQuality: 0.8,
        }).then(image => {
          console.log('take photo success == ', image);
        });
      }
    });
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
              <Icon name="image" size={22} color={Color.lightBlackColor} />
            </View>
            <Text style={{marginLeft: 16, fontSize: 16, fontWeight: '600'}}>ជ្រើសរើសរូបភាព</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openCamera()} style={styles.button}>
            <View style={{backgroundColor: Color.lightGrayColor, borderRadius: 40, padding: 5}}>
              <Icon name="camera-alt" size={22} color={Color.lightBlackColor} />
            </View>
            <Text style={{marginLeft: 16, fontSize: 16, fontWeight: '600'}}>ថតរូប</Text>
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

export default ImageSelector;