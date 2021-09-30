import React, { Component } from 'react';
import { ScrollView, Pressable, Keyboard } from 'react-native';

class RaisingProposedScrollView extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 28}}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => Keyboard.dismiss()}>
          { this.props.children }
        </Pressable>
      </ScrollView>
    )
  }
}

export default RaisingProposedScrollView;