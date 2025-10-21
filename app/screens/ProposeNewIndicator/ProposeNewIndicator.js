import React from 'react';
import { Animated, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {LocalizationContext} from '../../components/Translations';
import ProposeNewIndicatorNavHeader from '../../components/ProposeNewIndicator/ProposeNewIndicatorNavHeader';
import ProposeNewIndicatorSearchBox from '../../components/ProposeNewIndicator/ProposeNewIndicatorSearchBox';
import ProposeNewIndicatorProposedList from '../../components/ProposeNewIndicator/ProposeNewIndicatorProposedList';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';
import { containerPadding, bottomButtonContainerPadding } from '../../utils/responsive_util';
import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import { screenPaddingBottom } from '../../utils/component_util';
import ProposedIndicator from '../../models/ProposedIndicator';
import Participant from '../../models/Participant';
import BottomButton from '../../components/BottomButton';
import settingHelper from '../../helpers/setting_helper';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import { updateRaisedParticipants } from '../../services/participant_service';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import {saveParticipant} from '../../actions/participantAction';
import {setSelectedIndicators} from '../../actions/selectedIndicatorAction';
import { participantModalSnapPoints } from '../../constants/modal_constant';
import Color from '../../themes/color';

class ProposeNewIndicator extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.state = {
      proposedIndicators: [],
      isValid: false,
      isIndicatorBase: true,
      participantUuid: !!props.route.params.participant_uuid ? props.route.params.participant_uuid : null,
      endpointId: null,
      playingUuid: null,
      isSearching: false
    }
    this.scrollY = new Animated.Value(0)
    this.formModalRef = React.createRef();
    this.bottomSheetRef = React.createRef();
    const { last_order_number, previous_proposed_indicators } = proposedIndicatorHelper.getLastProposed(props.route.params.scorecard_uuid, props.route.params.participant_uuid)
    this.lastOrderNumber = last_order_number
    AsyncStorage.setItem('previous-proposed-indicators', JSON.stringify(previous_proposed_indicators));
    this.searchBoxRef = React.createRef();
  }
  async componentDidMount() {
    const {scorecard_uuid, participant_uuid} = this.props.route.params;
    const isIndicatorBase = await isProposeByIndicatorBase()
    const proposedIndicators = isIndicatorBase ? ProposedIndicator.getAllDistinct(this.props.route.params.scorecard_uuid) : ProposedIndicator.getAllDistinctByParticipant(scorecard_uuid, participant_uuid)
    this.setState({
      proposedIndicators: proposedIndicators,
      isValid: proposedIndicators.length > 0,
      isIndicatorBase: isIndicatorBase,
      endpointId: await settingHelper.getSavedEndpointUrlId()
    })
  }

  save = () => {
    updateRaisedParticipants(this.props.route.params.scorecard_uuid);
    const participants = JSON.parse(JSON.stringify(Participant.getAllByScorecard(this.props.route.params.scorecard_uuid)));
    this.props.saveParticipant(participants, this.props.route.params.scorecard_uuid);
    this.props.setSelectedIndicators(proposedIndicatorService.getProposedIndicators(this.props.route.params.scorecard_uuid));
    this.props.navigation.goBack();
  }

  updateProposedIndicator = () => {
    const proposedIndicators = this.state.isIndicatorBase ? ProposedIndicator.getAllDistinct(this.props.route.params.scorecard_uuid) : ProposedIndicator.getAllDistinctByParticipant(this.props.route.params.scorecard_uuid, this.state.participantUuid)
    this.setState({
      isValid: proposedIndicators.length > 0,
      proposedIndicators: proposedIndicators
    });
  }

  onBottomSheetDismiss = () => {
    this.updateProposedIndicator()
    this.bottomSheetRef.current?.setBodyContent(null)
  }

  handleUnconfirmedIndicator = () => {
    proposedIndicatorService.handleUnconfirmedIndicator(this.props.route.params.scorecard_uuid, this.state.participantUuid, this.lastOrderNumber)
  }

  updateSelectedParticipant(participantUuid) {
    this.formModalRef.current?.dismiss()
    if (this.state.participantUuid != participantUuid) {
      this.handleUnconfirmedIndicator();

      this.setState({
        isValid: false,
        participantUuid: participantUuid
      });
    }
  }

  renderSearchBox = () => {
    return <ProposeNewIndicatorSearchBox scorecardUuid={this.props.route.params.scorecard_uuid} updateIsValid={(status) => this.setState({isValid: status})}
              bottomSheetRef={this.bottomSheetRef}
              formModalRef={this.formModalRef}
              isIndicatorBase={this.state.isIndicatorBase}
              participantUuid={this.state.participantUuid}
              updateProposedIndicator={() => this.updateProposedIndicator()}
              playingUuid={this.state.playingUuid}
              updatePlayingUuid={(uuid) => this.setState({playingUuid: uuid})}
              scrollY={this.scrollY}
              proposedIndicators={this.state.proposedIndicators.length}
              isEdit={this.props.route.params.is_edit}
              ref={this.searchBoxRef}
              updateIsSearching={(isSearching) => this.setState({isSearching})}
              updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
            />
  }

  renderProposedIndicators = () => {
    return <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 6, paddingTop: 2, backgroundColor: Color.defaultBgColor, opacity: this.state.isSearching ? 0 : 1}} style={{zIndex: -2}} showsVerticalScrollIndicator={false}
              onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.scrollY}}}], { useNativeDriver: false })}
           >
              <ProposeNewIndicatorProposedList scorecardUuid={this.props.route.params.scorecard_uuid}
                proposedIndicators={this.state.proposedIndicators}
                endpointId={this.state.endpointId}
                bottomSheetRef={this.bottomSheetRef}
                formModalRef={this.formModalRef}
                isIndicatorBase={this.state.isIndicatorBase}
                participantUuid={this.state.participantUuid}
                updateProposedIndicator={() => this.updateProposedIndicator()}
                playingUuid={this.state.playingUuid}
                updatePlayingUuid={(uuid) => this.setState({playingUuid: uuid})}
              />
           </ScrollView>
  }

  renderBody = () => {
    const {translations} = this.context
    return <View style={{flexGrow: 1, paddingHorizontal: containerPadding, paddingTop: 15, backgroundColor: Color.defaultBgColor, paddingBottom: screenPaddingBottom(this.props.sdkVersion), zIndex: 0}}>
              {this.renderSearchBox()}
              <View style={{flex: 1}}>
                {this.renderProposedIndicators()}
                <View style={[bottomButtonContainerPadding(), {paddingHorizontal: 0, zIndex: -2, opacity: this.state.isSearching ? 0 : 1}]}>
                  <BottomButton disabled={!this.state.isValid} label={translations.saveAndGoNext} onPress={() => this.save()} />
                </View>
              </View>
           </View>
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <React.Fragment>
          <ProposeNewIndicatorNavHeader bottomSheetRef={this.bottomSheetRef} formModalRef={this.formModalRef} handleUnconfirmedIndicator={() => this.handleUnconfirmedIndicator()} searchBoxRef={this.searchBoxRef} />
          {this.renderBody()}
          <FormBottomSheetModal ref={this.bottomSheetRef} formModalRef={this.formModalRef} snapPoints={participantModalSnapPoints} onDismissModal={() => this.onBottomSheetDismiss()} />
        </React.Fragment>
      </TouchableWithoutFeedback>
    )
  }
}

function mapStateToProps(state) {
  return {
    sdkVersion: state.sdkVersion
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveParticipant: (participants, scorecardUUID) => dispatch(saveParticipant(participants, scorecardUUID)),
    setSelectedIndicators: (selectedIndicators) => dispatch(setSelectedIndicators(selectedIndicators)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProposeNewIndicator)