import React from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {Text} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../Translations';
import SearchBox from '../SearchBox/SearchBox';
import ProposeNewIndicatorSearchResult from './ProposeNewIndicatorSearchResult';
import ProposeNewIndicatorInstructionModal from './ProposeNewIndicatorInstructionModal';
import Color from '../../themes/color';
import IndicatorService from '../../services/indicator_service';
import {bodyFontSize} from '../../utils/font_size_util';

const PROPOSE_TOOLTIP = 'PROPOSE_TOOLTIP'

class ProposeNewIndicatorSearchBox extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.state = {
      searchedText: '',
      showResult: false,
      indicators: [],
      searchContainerHeight: 0,
      instructionVisible: false,
    }
    this.isComponentUnmount = false;
  }

  componentDidMount() {
    setTimeout(async () => {
      if (!this.isComponentUnmount && !await AsyncStorage.getItem(PROPOSE_TOOLTIP))
        this.setState({instructionVisible: true})
    }, 200);
  }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
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

  onInstructionDismiss = () => {
    AsyncStorage.setItem(PROPOSE_TOOLTIP, 'true');
    this.setState({instructionVisible: false})
  }

  renderSearchBox = () => {
    const {translations} = this.context
    return <View onLayout={(event) => this.setState({ searchContainerHeight: event.nativeEvent.layout.height })}>
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
  }

  render() {
    return (
      <React.Fragment>
        { this.renderSearchBox() }
        { this.state.showResult && <ProposeNewIndicatorSearchResult indicators={this.state.indicators} scorecardUuid={this.props.scorecardUuid} searchedText={this.state.searchedText}
                                      closeSearch={() => this.closeSearch()} searchContainerHeight={this.state.searchContainerHeight} formModalRef={this.props.formModalRef} bottomSheetRef={this.props.bottomSheetRef}
                                      isIndicatorBase={this.props.isIndicatorBase} participantUuid={this.props.participantUuid}
                                      updateProposedIndicator={this.props.updateProposedIndicator}
                                      playingUuid={this.props.playingUuid} updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
                                   />
        }
        <ProposeNewIndicatorInstructionModal visible={this.state.instructionVisible} isIndicatorBase={this.props.isIndicatorBase} onDismiss={() => this.onInstructionDismiss()}/>
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorSearchBox