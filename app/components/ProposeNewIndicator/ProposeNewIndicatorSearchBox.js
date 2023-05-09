import React from 'react';
import { Animated, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {Text} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import SearchBox from '../SearchBox/SearchBox';
import ProposeNewIndicatorSearchResult from './ProposeNewIndicatorSearchResult';
import ProposeNewIndicatorInstructionModal from './ProposeNewIndicatorInstructionModal';
import ProposeNewIndicatorParticipantInfo from './ProposeNewIndicatorParticipantInfo';
import BoldLabel from '../Share/BoldLabel';
import Color from '../../themes/color';
import IndicatorService from '../../services/indicator_service';
import {bodyFontSize} from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';
import proposedIndicatorStyleHelper from '../../helpers/proposed_indicator_style_helper';

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
      instructionHeight: 0,
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
    this.setState({ searchedText: text}, () => {
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

  renderParticipantInfo = () => {
    return <ProposeNewIndicatorParticipantInfo
              scorecardUuid={this.props.scorecardUuid}
              participantUuid={this.props.participantUuid}
              updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
              bottomSheetRef={this.props.bottomSheetRef}
              formModalRef={this.props.formModalRef}
              isEdit={this.props.isEdit}
           />
  }

  renderSearchBox = () => {
    const {translations} = this.context
    const marginTop = this.props.scrollY.interpolate({
      inputRange: [0, 40, 60, 80],
      outputRange: proposedIndicatorStyleHelper.getSearchBoxMarginTop(this.state.instructionHeight),
      extrapolate: 'clamp',
    })
    return <Animated.View onLayout={(event) => this.setState({ searchContainerHeight: event.nativeEvent.layout.height + 80 })} style={{marginTop: marginTop, backgroundColor: Color.defaultBgColor, borderRadius: 10, zIndex: 0}}>
              <SearchBox value={this.state.searchedText} containerStyle={{paddingVertical: 0, paddingHorizontal: 0, paddingBottom: 0, backgroundColor: 'transparent'}}
                inputContainerStyle={{backgroundColor: Color.whiteColor, marginTop: -5, marginLeft: -1}}
                placeholder={translations.theIndicatorNameYouWantToPropose}
                onChangeText={(text) => this.onChangeText(text)}
                onClearSearch={() => this.setState({searchedText: ''})}
                onFocus={() => this.onFocus()}
              />
              { !this.props.isIndicatorBase && this.renderParticipantInfo() }
              <BoldLabel label={`${translations.proposedIndicator}: ${this.props.proposedIndicators}`} customStyle={{marginTop: 10, marginBottom: 12, zIndex: -2}} />
           </Animated.View>
  }

  render() {
    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={() => this.closeSearch()}>
          <View style={{backgroundColor: 'white', padding: 8, borderRadius: 10, zIndex: 0}}
            onLayout={(event) => this.setState({instructionHeight: event.nativeEvent.layout.height})}
          >
            <Text style={{fontSize: bodyFontSize(), color: 'black'}}>{this.context.translations.proposeIndicatorInstruction}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{position: 'absolute', width: wp('100%'), height: '100%', paddingHorizontal: containerPadding}}>
          { this.renderSearchBox() }
          { this.state.showResult &&
            <ProposeNewIndicatorSearchResult indicators={this.state.indicators} scorecardUuid={this.props.scorecardUuid} searchedText={this.state.searchedText}
              closeSearch={() => this.closeSearch()} searchContainerHeight={this.state.searchContainerHeight} formModalRef={this.props.formModalRef} bottomSheetRef={this.props.bottomSheetRef}
              instructionHeight={this.state.instructionHeight}
              isIndicatorBase={this.props.isIndicatorBase} participantUuid={this.props.participantUuid}
              updateProposedIndicator={this.props.updateProposedIndicator}
              playingUuid={this.props.playingUuid} updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
              scrollY={this.props.scrollY}
            />
          }
          <ProposeNewIndicatorInstructionModal visible={this.state.instructionVisible} isIndicatorBase={this.props.isIndicatorBase} onDismiss={() => this.onInstructionDismiss()}/>
        </View>
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorSearchBox