import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { connect } from 'react-redux';
import { setScorecardReferences } from '../../actions/scorecardReferenceAction';

import ScorecardReference from '../../models/ScorecardReference';
import Scorecard from '../../models/Scorecard';

import { LocalizationContext } from '../../components/Translations';
import SelectedImageHeader from '../../components/SelectedImage/SelectedImageHeader';
import SelectedImageList from '../../components/SelectedImage/SelectedImageList';
import ImageSelector from '../../components/ImageSelector';
import NoDataMessage from '../../components/NoDataMessage';

import scorecardReferenceService from '../../services/scorecard_reference_service';
import { getDeviceStyle, isShortWidthScreen } from '../../utils/responsive_util';

let _this = null;

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

    _this = this;
  }

  toggleSelectImage(imagePath) {
    if (_this.state.scorecard.finished)
      return;

    let selectedImages = _this.state.selectedImages;

    if (!_this.isSelected(imagePath))
      selectedImages.push(imagePath);
    else {
      const index = selectedImages.indexOf(imagePath);
      selectedImages.splice(index, 1);
    }

    _this.setState({ selectedImages })
  }

  isSelected(imagePath) {
    for (let i = 0; i < _this.state.selectedImages.length; i++) {
      if (_this.state.selectedImages[i] == imagePath)
        return true;
    }

    return false;
  }

  renderImages() {
    return <SelectedImageList
              scorecardImages={this.state.scorecardImages}
              toggleSelectImage={this.toggleSelectImage}
              isSelected={this.isSelected}
              openImagePicker={() => this.setState({ imagePickerVisible: true })}
           />
  }

  confirmDelete() {
    scorecardReferenceService.remove(this.props.route.params.scorecard_uuid, this.state.selectedImages, (scorecardImages) => {
      this.props.setScorecardReferences(scorecardImages);
      this.setState({
        scorecardImages: scorecardImages,
        selectedImages: []
      });
    });
  }

  renderNoImage() {
    return (
      <NoDataMessage
        title={ this.context.translations.pleaseChooseTheImage }
        buttonLabel={ this.context.translations.chooseImage }
        onPress={() => this.setState({ imagePickerVisible: true })}
      />
    )
  }

  selectImageSuccess(scorecardImages) {
    this.props.setScorecardReferences(scorecardImages);
    this.setState({ scorecardImages });
  }

  render() {
    const listContainerPadding = getDeviceStyle(wp('5%'), isShortWidthScreen() ? wp('3.3%') : wp('3.8%'));

    return (
      <View style={{flex: 1}}>
        <SelectedImageHeader
          onBackPress={() => this.props.navigation.goBack()}
          hasDeleteButton={this.state.selectedImages.length > 0}
          confirmDelete={() => this.confirmDelete()}
          isScorecardFinished={this.state.scorecard.finished}
        />

        <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, paddingHorizontal: listContainerPadding, paddingBottom: 30 }}>
          { this.state.scorecardImages.length === 0 && this.renderNoImage() }

          { this.state.scorecardImages.length > 0 && this.renderImages() }
        </ScrollView>

        <ImageSelector
          modalVisible={this.state.imagePickerVisible}
          closeModal={() => this.setState({ imagePickerVisible: false })}
          scorecardUuid={this.props.route.params.scorecard_uuid}
          selectImageSuccess={(scorecardImages) => this.selectImageSuccess(scorecardImages)}
        />
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setScorecardReferences: (scorecardReferences) => dispatch(setScorecardReferences(scorecardReferences)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SelectedImage)