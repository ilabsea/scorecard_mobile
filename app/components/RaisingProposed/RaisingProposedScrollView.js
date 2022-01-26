import React, { Component } from 'react';
import { ScrollView, Pressable, Keyboard } from 'react-native';

class RaisingProposedScrollView extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 50, marginHorizontal: -8}}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        onScroll={(event) => !!this.props.onScroll && this.props.onScroll(event)}
      >
        <Pressable onPress={() => Keyboard.dismiss()}>
          { this.props.children }
        </Pressable>
      </ScrollView>
    )
  }
}

export default RaisingProposedScrollView;