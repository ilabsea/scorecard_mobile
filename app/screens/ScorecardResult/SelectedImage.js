import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Icon } from 'native-base';

import Color from '../../themes/color';

class SelectedImage extends Component {
  renderListItem(image, index) {
    // console.log('image source == ', data)

    return (
      <TouchableOpacity style={[{borderWidth: 1, borderColor: '#b5b5b5', marginHorizontal: 5, marginVertical: 5, borderRadius: 0}, index == 1 || index == 2 ? {borderColor: Color.clickableColor, borderWidth: 2} : {}]}>
        { (index == 1 || index == 2) &&
          <Icon
            name="check-circle"
            type="FontAwesome"
            style={{color: Color.clickableColor, fontSize: 24, position: 'absolute', right: 0, top: 0, zIndex: 10}}
          />
        }

        <Image
          source={image}
          style={{width: 100, height: 100}}
        />
      </TouchableOpacity>
    )
  }

  render() {
    const images = [
      { uri: 'file:///storage/emulated/0/Android/data/org.instedd.ilabsea.community_scorecard/files/Pictures/adbc6483-27b3-41bb-ad39-41c2a8f9e7f1.jpg' },
      { uri: 'file:///storage/emulated/0/Android/data/org.instedd.ilabsea.community_scorecard/files/Pictures/adbc6483-27b3-41bb-ad39-41c2a8f9e7f1.jpg' },
      { uri: 'file:///storage/emulated/0/Android/data/org.instedd.ilabsea.community_scorecard/files/Pictures/adbc6483-27b3-41bb-ad39-41c2a8f9e7f1.jpg' },
      { uri: 'file:///storage/emulated/0/Android/data/org.instedd.ilabsea.community_scorecard/files/Pictures/adbc6483-27b3-41bb-ad39-41c2a8f9e7f1.jpg' },
      { uri: 'file:///storage/emulated/0/Android/data/org.instedd.ilabsea.community_scorecard/files/Pictures/582930df-c8b2-4704-8de7-01004348d1a8.jpg' },
    ]


    return (
      <View style={{flex: 1}}>
        <FlatList
          data={images}
          renderItem={ ({item, index}) =>
            this.renderListItem(item, index)
          }
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5 }}
          contentContainerStyle={{borderWidth: 0, paddingHorizontal: 10, marginTop: 10}}
        />
      </View>
    )
  }
}

export default SelectedImage;