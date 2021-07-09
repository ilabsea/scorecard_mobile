import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

import Color from '../themes/color';

const screenHeight = Dimensions.get('screen').height;

class BottomHalfModal extends Component {
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        backdropColor="rgba(0, 0, 0, 0.4)"
        swipeDirection="down"
        onSwipeComplete={() => this.props.closeModal()}
        onBackdropPress={() => this.props.closeModal()}
        style={styles.modalContainer}
      >
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={[styles.contentContainer, this.props.modalContentStyle]}>
            <View style={{width: 50, height: 5, backgroundColor: Color.lightGrayColor, borderRadius: 10, alignSelf: 'center', marginBottom: 10}} />
            {this.props.children}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
  },
  contentContainer: {
    height: screenHeight / 2,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
});

export default BottomHalfModal;