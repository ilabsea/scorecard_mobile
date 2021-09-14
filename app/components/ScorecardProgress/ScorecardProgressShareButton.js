import React, { Component } from 'react';
import { TouchableOpacity, Share } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';

import { isFileExist } from '../../services/local_file_system_service'

class ScorecardProgressShareButton extends Component {
  async shareSubmittedScorecard() {
    // Download the PDF file form the api then share it via social media

    // react-native-share library
    // const shareOptions = {
    //     // title: 'React Native Share Example',
    //     // message: 'Check out this photo!',
    //     url: `${RNFS.CachesDirectoryPath}/name.png`,
    //     type: 'image/png',
    //     // subject: 'Check out this photo!',
    // };
    // Share.open(shareOptions);


    await Share.share({
      url: `file://${RNFS.DocumentDirectoryPath}/sample1.pdf`,
      title: `file://${RNFS.DocumentDirectoryPath}/sample1.pdf`,
      // type: 'application/pdf'
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.shareSubmittedScorecard()}>
        <MaterialIcon name="share" size={22} color="white" />
      </TouchableOpacity>
    );
  }
}

export default ScorecardProgressShareButton;