import React from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {Text} from 'react-native-paper';

import {LocalizationContext} from '../Translations';
import SearchBox from '../SearchBox/SearchBox';
import ProposeNewIndicatorSearchResult from './ProposeNewIndicatorSearchResult';
import Color from '../../themes/color';
import IndicatorService from '../../services/indicator_service';
import {bodyFontSize} from '../../utils/font_size_util';

class ProposeNewIndicatorSearchBox extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.state = {
      searchedText: '',
      showResult: false,
      indicators: [],
      searchContainerHeight: 0,
      hasTourtip: false
    }
    this.isComponentUnmount = false;
  }

  getDefaultIndicators = async () => {
    const defaultIndicators = await new IndicatorService().getIndicatorList(this.props.scorecardUuid, '', false)
    return defaultIndicators.slice(0, 10)
  }

  onFocus = async () => {
    this.setState({
      showResult: true,
      indicators: await this.getDefaultIndicators()
    })
    this.props.updatePlayingUuid(null)
  }

  findIndicator = async (text) => {
    this.setState({ indicators: text != '' ? await new IndicatorService().getIndicatorList(this.props.scorecardUuid, text, false) : await this.getDefaultIndicators() })
  }

  onChangeText = (text) => {
    this.setState({
      searchedText: text,
    }, () => {
      this.findIndicator(text)
    })
  }

  closeSearch = () => {
    Keyboard.dismiss()
    this.setState({showResult: false, searchedText: ''})
    this.props.updatePlayingUuid(null)
  }

  render() {
    const {translations} = this.context
    return (
      <React.Fragment>
        <View onLayout={(event) => this.setState({ searchContainerHeight: event.nativeEvent.layout.height })}>
          <TouchableWithoutFeedback onPress={() => this.closeSearch()}>
            <View style={{backgroundColor: Color.whiteColor, padding: 8, borderRadius: 10}}>
              <Text style={{fontSize: bodyFontSize(), color: Color.lightBlackColor}}>{translations.proposeIndicatorInstruction}</Text>
            </View>
          </TouchableWithoutFeedback>
          <SearchBox value={this.state.searchedText} containerStyle={{paddingVertical: 0, paddingHorizontal: 0, paddingBottom: 0, backgroundColor: 'transparent', marginTop: 12}}
            inputContainerStyle={{backgroundColor: Color.whiteColor}}
            placeholder={translations.theIndicatorNameYouWantToPropose}
            onChangeText={(text) => this.onChangeText(text)}
            onClearSearch={() => this.setState({searchedText: ''})}
            onFocus={() => this.onFocus()}
          />
        </View>
        { this.state.showResult && <ProposeNewIndicatorSearchResult indicators={this.state.indicators} scorecardUuid={this.props.scorecardUuid} searchedText={this.state.searchedText}
                                      closeSearch={() => this.closeSearch()} searchContainerHeight={this.state.searchContainerHeight} formModalRef={this.props.formModalRef} bottomSheetRef={this.props.bottomSheetRef}
                                      isIndicatorBase={this.props.isIndicatorBase} participantUuid={this.props.participantUuid}
                                      updateProposedIndicator={this.props.updateProposedIndicator}
                                      playingUuid={this.props.playingUuid} updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
                                   />
        }
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorSearchBox