import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Color from '../themes/color';
import { LocalizationContext } from './Translations';
import BottomHalfModal from './BottomHalfModal';

import ScorecardReference from '../models/ScorecardReference';
import scorecardReferenceService from '../services/scorecard_reference_service';
import { getDeviceStyle, isShortScreenDevice } from '../utils/responsive_util';
import { bodyFontSize } from '../utils/font_size_util';

const screenHeight = Dimensions.get('screen').height;

class ImageSelector extends Component {
  static contextType = LocalizationContext;

  openImagePicker() {
    this.props.closeModal();

    ImagePicker.openPicker({
      width: 640,
      height: 320,
      cropping: true,
      multiple: true,
      compressImageQuality: 0.8,
    }).then(images => {
      images.map(image => {
        scorecardReferenceService.add(this.props.scorecardUuid, image);
      });

      if (this.props.selectImageSuccess)
        this.props.selectImageSuccess(ScorecardReference.findByScorecard(this.props.scorecardUuid));
    })
    .catch(error => {
      console.log('select image error == ', error);
    })
  }

  openCamera() {
    this.props.closeModal();

    ImagePicker.openCamera({
      mediaType: 'photo',
      compressImageQuality: 0.8,
    }).then(image => {
      scorecardReferenceService.add(this.props.scorecardUuid, image);

      if (this.props.selectImageSuccess)
        this.props.selectImageSuccess(ScorecardReference.findByScorecard(this.props.scorecardUuid));
    })
    .catch(error => {
      console.log('take photo error = ', error)
    })
  }

  render() {
    const { translations } = this.context;
    const modalHeight = getDeviceStyle(screenHeight / 7, isShortScreenDevice() ? hp('22%') : hp('20.5%'))

    return (
      <BottomHalfModal
        isVisible={this.props.modalVisible}
        closeModal={() => this.props.closeModal()}
        modalContentStyle={{ height: modalHeight }}
      >
        <View>
          <TouchableOpacity onPress={() => this.openImagePicker()} style={[styles.button, { marginTop: 10 }]}>
            <View style={{width: 'auto', backgroundColor: Color.lightGrayColor, borderRadius: 40, padding: 6}}>
              <Icon name="image" size={22} color={Color.lightBlackColor} />
            </View>
            <Text style={{marginLeft: 16, fontSize: bodyFontSize(), fontWeight: '600'}}>{translations.chooseImage}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openCamera()} style={styles.button}>
            <View style={{backgroundColor: Color.lightGrayColor, borderRadius: 40, padding: 5}}>
              <Icon name="camera-alt" size={22} color={Color.lightBlackColor} />
            </View>
            <Text style={{marginLeft: 16, fontSize: bodyFontSize(), fontWeight: '600'}}>{translations.takePhoto}</Text>
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