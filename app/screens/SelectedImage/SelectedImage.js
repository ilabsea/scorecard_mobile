import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import ScorecardReference from '../../models/ScorecardReference';
import Scorecard from '../../models/Scorecard';

import { LocalizationContext } from '../../components/Translations';
import SelectedImageHeader from '../../components/SelectedImage/SelectedImageHeader';
import ImageSelector from '../../components/ImageSelector';

import scorecardReferenceService from '../../services/scorecard_reference_service';
import { getDeviceStyle, isShortWidthScreen } from '../../utils/responsive_util';
import NoDataMessageTabletStyles from '../../styles/tablet/NoDataMessageComponentStyle';
import NoDataMessageMobileStyles from '../../styles/mobile/NoDataMessageComponentStyle';

const responsiveStyles = getDeviceStyle(NoDataMessageTabletStyles, NoDataMessageMobileStyles);

class SelectedImage extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
      scorecardImages: ScorecardReference.findByScorecard(props.route.params.scorecard_uuid),
      selectedImages: [],
      imagePickerVisible: false,
    }
  }

  toggleSelectImage(imagePath) {
    if (this.state.scorecard.finished)
      return;

    let selectedImages = this.state.selectedImages;

    if (!this.isSelected(imagePath))
      selectedImages.push(imagePath);
    else {
      const index = selectedImages.indexOf(imagePath);
      selectedImages.splice(index, 1);
    }

    this.setState({ selectedImages })
  }

  isSelected(imagePath) {
    for (let i = 0; i < this.state.selectedImages.length; i++) {
      if (this.state.selectedImages[i] == imagePath)
        return true;
    }

    return false;
  }

  renderListItem(item, index) {
    const isSelected = this.isSelected(item.image_path);

    return (
      <TouchableOpacity onPress={() => this.toggleSelectImage(item.image_path)} key={index}
        style={[styles.imageContainer, isSelected ? {borderColor: Color.clickableColor} : {}]}
      >
        { isSelected &&
          <View style={{backgroundColor: Color.clickableColor, position: 'absolute', right: 0, top: 0, zIndex: 10, borderRadius: 60, height: 20, width: 20, justifyContent: 'center'}}>
            <MaterialIcon name='check' size={20} color={Color.whiteColor} />
          </View>
        }

        <Image
          source={{uri: item.image_path}}
          style={{width: wp('28.3%'), height: wp('28.3%')}}
        />
      </TouchableOpacity>
    )
  }

  renderImages(scorecardImages) {
    return scorecardImages.map((item, index) => {
      return this.renderListItem(item, index)
    })
  }

  confirmDelete() {
    scorecardReferenceService.remove(this.props.route.params.scorecard_uuid, this.state.selectedImages, (scorecardImages) => {
      this.setState({
        scorecardImages: scorecardImages,
        selectedImages: []
      });
    });
  }

  render() {
    const { translations } = this.context;
    const listContainerPadding = getDeviceStyle(wp('5%'), isShortWidthScreen() ? wp('3.3%') : wp('3.8%'));

    return (
      <View style={{flex: 1}}>
        <SelectedImageHeader
          onBackPress={() => this.props.navigation.goBack()}
          hasDeleteButton={this.state.selectedImages.length > 0}
          confirmDelete={() => this.confirmDelete()}
          openImagePicker={() => this.setState({ imagePickerVisible: true })}
          isScorecardFinished={this.state.scorecard.finished}
        />

        { this.state.scorecardImages.length == 0 &&
          <Text style={[responsiveStyles.label, {textAlign: 'center', marginTop: 20, }]}>
            {translations.noImageIsSelected}
          </Text>
        }

        <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, paddingHorizontal: listContainerPadding, paddingBottom: 30 }}>
          { this.renderImages(this.state.scorecardImages) }
        </ScrollView>

        <ImageSelector
          modalVisible={this.state.imagePickerVisible}
          closeModal={() => this.setState({ imagePickerVisible: false })}
          scorecardUuid={this.props.route.params.scorecard_uuid}
          selectImageSuccess={(scorecardImages) => { this.setState({ scorecardImages }) }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 1,
    borderColor: '#b5b5b5',
    marginHorizontal: 4,
    marginVertical: 5,
    borderRadius: 0,
  }
});

export default SelectedImage;