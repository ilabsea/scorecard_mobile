import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { requireSignFontSize } from '../../utils/font_size_util';
import InputBoxTabletStyles from '../../styles/tablet/InputBoxComponentStyle';
import InputBoxMobileStyles from '../../styles/mobile/InputBoxComponentStyle';

const styles = getDeviceStyle(InputBoxTabletStyles, InputBoxMobileStyles);

const BORDER = 'border';
const TEXT = 'text';

class InputBox extends React.Component {
  getDisableStyle(type) {
    const styles = {
      'border': { borderColor: Color.disableCardColor },
      'text': { color: Color.lightGrayColor }
    }

    return this.props.disabled ? styles[type] : { };
  }

  render() {
    return (
      <View style={[styles.mainContainer, this.props.customContainerStyle, this.getDisableStyle(BORDER)]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleLabel, this.getDisableStyle(TEXT)]}>{ this.props.title }</Text>
          { this.props.isRequire && <Text style={{color: Color.redColor, marginTop: -2, fontSize: requireSignFontSize()}}> *</Text> }
        </View>

        <TouchableOpacity onPress={() => this.props.onPress()}>
          <View style={styles.textContainer}>
            <View style={{flex: 1}}>
              <Text style={[styles.itemTitle, this.getDisableStyle(TEXT)]}>{ this.props.label }</Text>
              { this.props.showSubLabel && <Text style={[styles.itemSubtitle, this.getDisableStyle(TEXT)]}>{ this.props.subLabel }</Text> }
            </View>

            { !!this.props.rightItem && this.props.rightItem }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default InputBox;

// How to call the InputBox
{/* <InputBox
  title=""
  isRequire={}
  label=""
  subLabel=""
  showSubLabel={}
  rightItem={}
  onPress={() => {}}
/> */}