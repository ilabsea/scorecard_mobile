import React from 'react';
import { Animated, Text, View, StyleSheet, ScrollView } from 'react-native';

import { LocalizationContext } from '../Translations';
import VotingIndicatorListItem from './VotingIndicatorListItem';
import PressableParticipantInfo from '../Share/PressableParticipantInfo';
import BottomButton from '../BottomButton';
import Tip from '../Share/Tip';
import CollapsibleNavHeader from '../Share/CollapsibleNavHeader';
import { navigate } from '../../navigators/app_navigator';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { titleFontSize } from '../../utils/font_size_util';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import Participant from '../../models/Participant';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import { hasVoting } from '../../helpers/voting_indicator_helper';
import {headerShrinkOffset} from '../../constants/component_style_constant';

class VotingIndicatorListContent extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.scrollY = new Animated.Value(0)
    this.isHeaderShrunk = false
  }

  _goNext() {
    scorecardTracingStepsService.trace(this.props.scorecard.uuid, 7);
    navigate('OfflineScorecardResult', {scorecard_uuid: this.props.scorecard.uuid});
  }

  _renderList() {
    return this.props.votingIndicators.map((item, index) => 
      <VotingIndicatorListItem indicator={item} key={index}
        scorecard={this.props.scorecard}
        votingInfoModalRef={this.props.votingInfoModalRef}
        infoModalRef={this.props.infoModalRef}
      />
    );
  }

  closeModal() {
    this.props.updateModalVisible(false)
    this.props.participantModalRef.current?.dismiss();
  }

  _renderAddNewRating() {
    const { translations } = this.context;
    return (
      <View style={{flex: 1, backgroundColor: Color.defaultBgColor, paddingHorizontal: containerPadding}}>
        <View style={{flexDirection: 'row', marginBottom: 16}}>
          <Text style={[styles.h1, {flex: 1, height: '100%', textAlignVertical: "center", marginBottom: 0}]}>{translations.top_indicators} {this.props.votingIndicators.length}</Text>
          <PressableParticipantInfo
            title={translations.addNewVoting}
            participants={ Participant.getUnvoted(this.props.scorecard.uuid) }
            scorecardUuid={ this.props.scorecard.uuid }
            mode={{type: 'button', label: translations.newVote, iconName: 'add-outline'}}
            buttonVisible={true}
            selectParticipant={(participant) => navigate('VotingIndicatorForm', {scorecard_uuid: this.props.scorecard.uuid, participant_uuid: participant.uuid})}
            participantModalRef={this.props.participantModalRef}
            formModalRef={this.props.formModalRef}
            closeModal={() => this.closeModal()}
          />
        </View>
      </View>
    )
  }

  render() {
    const containerPaddingTop = this.scrollY.interpolate({
      // inputRange: [0, 100, 140],
      // outputRange: [156, 80, 72],
      inputRange: [0, 100, 140],
      outputRange: [206, 128, 106],
      extrapolate: 'clamp',
    })
    return (
      <React.Fragment>
        <CollapsibleNavHeader title={this.context.translations.voting} scrollY={this.scrollY} progressIndex={3} isPassProposeStep={true}
          showTipModal={() => !!this.isHeaderShrunk && this.props.tipModalRef.current?.present()} tipIconVisible={true}
        />
        <Animated.View style={{flex: 1, paddingTop: containerPaddingTop, zIndex: -1}}>
          <ScrollView stickyHeaderIndices={[1]}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.scrollY}}}],
                      { listener: (event) => {this.isHeaderShrunk = event.nativeEvent.contentOffset.y >= headerShrinkOffset}, useNativeDriver: false })}
          >
            <Tip screenName='VotingIndicatorList' showTipModal={() => this.props.tipModalRef.current?.present()} containerStyle={{margin: containerPadding, marginBottom: 0}} />
            { this._renderAddNewRating() }
            <View style={{flex: 1, paddingHorizontal: containerPadding}}>{ this._renderList() }</View>
          </ScrollView>
        </Animated.View>

        <View style={styles.container}>
          <BottomButton
            onPress={() => this._goNext()}
            customBackgroundColor={Color.headerColor}
            label={this.context.translations.next}
            disabled={!hasVoting(this.props.scorecard.uuid)}
          />
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: containerPadding,
  },
  h1: {
    fontSize: getDeviceStyle(24, titleFontSize()),
    fontFamily: FontFamily.title,
    marginBottom: getDeviceStyle(20, 30),
  }
})

export default VotingIndicatorListContent;