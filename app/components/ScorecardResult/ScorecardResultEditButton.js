import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';

import ScorecardResultButton from './ScorecardResultButton';
import Color from '../../themes/color';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { pressableItemSize } from '../../utils/component_util';

class ScorecardResultEditButton extends React.Component {
  render() {
    // return (
    //   <View style={{flexDirection: 'row', padding: 6, alignItems: 'center', justifyContent: 'center'}}>
    //     <TouchableOpacity onPress={() => this.onPress(fieldName, indicator, false)} style={styles.btnEdit}>
    //       <Text style={{color: Color.whiteColor, marginRight: 6}}>{JSON.parse(this.props.indicator[fieldName]).length}</Text>
    //       <Icon name={'pen'} type="FontAwesome5" style={{color: Color.whiteColor, fontSize: 14}}/>
    //     </TouchableOpacity>
    //   </View>
    // )
    const { fieldName, indicator } = this.props;

    return (
      <ScorecardResultButton
        onPress={() => this.props.onPress()}
        btnStyle={styles.btn}
        isScorecardFinished={false}
        indicator={indicator}
        showDefaultLabel={false}
      >
        <Text style={{color: Color.whiteColor, marginRight: 6}}>{JSON.parse(indicator[fieldName]).length}</Text>
        <Icon name={'pen'} type="FontAwesome5" style={{color: Color.whiteColor, fontSize: 14}}/>
      </ScorecardResultButton>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Color.clickableColor,
    marginLeft: 0,
    alignSelf: 'center',
    width: pressableItemSize(14),
    height: pressableItemSize()
  }
});

export default ScorecardResultEditButton;