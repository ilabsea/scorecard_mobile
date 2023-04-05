import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AudioCardView from 'react-native-audio-card-view';

import SearchBox from '../SearchBox/SearchBox';
import ProposeNewIndicatorSearchResultList from './ProposeNewIndicatorSearchResultList';
import Color from '../../themes/color';
import Indicator from '../../models/Indicator';
import IndicatorService from '../../services/indicator_service';

class ProposeNewIndicatorSearchBox extends React.Component {
  state = {
    searchIndicator: '',
    showResult: false,
    indicators: []
  }

  onFocus = async () => {
    const defaultIndicators = await Indicator.findByScorecard(this.props.scorecardUuid)
    this.setState({
      showResult: true,
      indicators: defaultIndicators.slice(0, 5)
    })
  }

  findIndicator = async (text) => {
    this.setState({
      indicators: text != '' ? await new IndicatorService().getIndicatorList(this.props.scorecardUuid, text, false) : await Indicator.findByScorecard(this.props.scorecardUuid)
    })
  }

  onChangeText = (text) => {
    this.setState({
      searchIndicator: text,
    }, () => {
      this.findIndicator(text)
    })
  }

  render() {
    return (
      <React.Fragment>
        <View style={{backgroundColor: Color.whiteColor, padding: 8, borderRadius: 10}}>
          <Text>បញ្ចូលឈ្មោះលក្ខណៈវិនិច្ឆ័យក្នុងប្រអប់ខាងក្រោមរួចចុចលើលក្ខណៈវិនិច្ឆ័យណាមួយដើម្បីធ្វើការបំផុស</Text>
        </View>

        <SearchBox value={this.state.searchIndicator} containerStyle={{paddingVertical: 0, paddingHorizontal: 0, paddingBottom: 0, backgroundColor: 'transparent', marginTop: 12}}
          inputContainerStyle={{backgroundColor: Color.whiteColor}}
          placeholder='បញ្ចូលលក្ខណៈវិនិច្ឆ័យដែលអ្នកចង់បំផុស'
          onChangeText={(text) => this.onChangeText(text)}
          onClearSearch={() => this.setState({searchIndicator: ''})}
          onFocus={() => this.onFocus()}
          // onBlur={() => this.setState({showResult: false})}
        />
        { this.state.showResult && <ProposeNewIndicatorSearchResultList indicators={this.state.indicators}/> }
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorSearchBox