import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import realm from '../../db/schema';
import HeaderTitle from '../../components/HeaderTitle';
import SelectPicker from '../../components/SelectPicker';

class Facilitator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scorecardDetail: '',
      facilitators: [],
      leadFacilitator: '',
      otherFaciliators: [],
    };
  }

  componentDidMount() {
    // const scorecard = await AsyncStorage.getItem('SCORECARD_DETAIL');
    // this.setState({scorecardDetail: JSON.parse(scorecard)});
  }

  // loadFaciliator = () => {
  //   const cafData = realm.objects('Caf').filtered('uuid = "' + uuid + '"');
  // }

  render() {
    return (
      <View style={styles.container}>
        <HeaderTitle
          headline="facilitatorList"
          subheading="pleaseFillInformationBelow"
        />

        <SelectPicker
          items={languages}
          selectedItem={textLocale}
          label="textDisplayIn"
          placeholder="selectLanguage"
          searchablePlaceholder="searchForLanguage"
          zIndex={6000}
          customLabelStyle={{zIndex: 6001}}
          showCustomArrow={true}
          onChangeItem={this.changeTextLocale}
          customDropDownContainerStyle={{marginTop: 30}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
  }
});

export default Facilitator;