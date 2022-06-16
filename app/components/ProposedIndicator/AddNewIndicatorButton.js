import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import AsyncStorage from '@react-native-community/async-storage';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import TourTipButton from '../TourTipButton';
import { bodyFontSize, bottomButtonIconSize } from '../../utils/font_size_util';

const WalkableView = walkthroughable(View);
class AddNewIndicatorButton extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      hasTourtip: false,
    }

    this.isComponentUnmount = false;
  }

  async componentDidMount() {
    const tourtipShown = await AsyncStorage.getItem('ADD_NEW_INDICATOR_TOURTIP');

    if (!this.isComponentUnmount && !tourtipShown) {
      this.setState({ hasTourtip: true });

      setTimeout(() => {
          this.props.start();
      }, 1500)
    }

    this.props.copilotEvents.on("stop", () => {
      AsyncStorage.setItem('ADD_NEW_INDICATOR_TOURTIP', 'true');
      this.setState({ hasTourtip: false });
    });
  }

  componentWillUnmount() {
    this.props.copilotEvents.off("stop");
    this.isComponentUnmount = true;
  }

  renderButton() {
    return (
      <TouchableOpacity onPress={() => this.props.showAddNewIndicatorModal()}
        style={[styles.container, !this.state.hasTourtip ? styles.floatPosition : {}]}
      >
        <Icon name='add' size={bottomButtonIconSize()} color={Color.clickableColor} />
        { this.props.scrollDirection == 'up' &&
          <Text style={{color: Color.clickableColor, marginHorizontal: 6, fontSize: bodyFontSize()}}>{ this.context.translations.addNewIndicator }</Text>
        }
      </TouchableOpacity>
    )
  }

  renderButtonWithToolTip() {
    const walkableWidth = this.context.appLanguage == 'km' ? 250 : 188;

    return (
      <CopilotStep
        text={this.context.translations.clickThisButtonToAddNewIndicator}
        order={1}
        name="addNewIndicator"
      >
        <WalkableView style={{ position: 'absolute', bottom: 8, right: 0, width: walkableWidth, height: 55 }}>
          { this.renderButton() }
        </WalkableView>
      </CopilotStep>
    )
  }

  render() {
    if (this.state.hasTourtip)
      return this.renderButtonWithToolTip();

    return this.renderButton();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    flexDirection: 'row',
    borderRadius: 30,
    padding: 12,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Color.clickableColor,
  },
  floatPosition: {
    position: 'absolute',
    bottom: 8,
    right: 0,
    zIndex: 10,
  }
});

export default copilot({
  overlay: 'svg',
  animated: true,
  verticalOffset: 24,
  backdropColor: "rgba(31, 31, 31, 0.7)",
  labels: {
    finish: <TourTipButton label='infoCloseLabel' />
  },
  stepNumberComponent: () => (<View/>)
})(AddNewIndicatorButton);