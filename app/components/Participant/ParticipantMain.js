import React from 'react';
import { Animated, ScrollView } from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantHeader from './ParticipantHeader';
import ParticipantList from './ParticipantList';
import EmptyListAction from '../Share/EmptyListAction';
import CollapsibleNavHeader from '../Share/CollapsibleNavHeader';
import AddNewParticipantMain from '../ParticipantModal/AddNewParticipantMain';
import { participantModalContentHeight, participantModalSnapPoints } from '../../constants/modal_constant';

const headerShrinkOffset = 93

class ParticipantMain extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props)
    this.scrollY = new Animated.Value(0)
    this.isHeaderShrunk = false
  }

  showParticipantBottomSheet(selectedParticipant) {
    if (!!selectedParticipant && !selectedParticipant.countable)
      return;
    
    this.props.formModalRef.current?.setSnapPoints(participantModalSnapPoints);
    this.props.formModalRef.current?.setBodyContent(this.getAddNewParticipantMain(selectedParticipant));
    this.props.participantModalRef.current?.present();
  }

  getAddNewParticipantMain(selectedParticipant) {
    return <AddNewParticipantMain
            scorecardUuid={ this.props.scorecardUuid }
            title={!!selectedParticipant ? this.context.translations.editParticipant : this.context.translations.addNewParticipant}
            subTitle={this.context.translations.participantInformation}
            selectedParticipant={selectedParticipant}
            onSaveParticipant={ (participant) => this.props.participantModalRef.current?.dismiss() }
            contentHeight={participantModalContentHeight}
          />
  }

  renderTitle() {
    return <ParticipantHeader
            participants={this.props.participants}
            scorecardUuid={this.props.scorecardUuid}
            addNewParticipant={() => this.showParticipantBottomSheet(null)} />
  }

  renderParticipantList = () => {
    return <ParticipantList
              scorecardUuid={this.props.scorecardUuid}
              participants={this.props.participants}
              participantModalRef={this.props.participantModalRef}
              formModalRef={this.props.formModalRef}
              showParticipantBottomSheet={(participant) => this.showParticipantBottomSheet(participant)}
           />
  }

  renderNoData() {
    return <EmptyListAction
            title={this.context.translations.pleaseAddParticipant}
            buttonLabel={this.context.translations.addNewParticipant}
            onPress={() => this.showParticipantBottomSheet(null)}
           />
  }

  render () {
    const containerPaddingTop = this.scrollY.interpolate({
      inputRange: [0, 100, 140],
      outputRange: [156, 56, 56],
      extrapolate: 'clamp',
    })

    return (
      <React.Fragment>
        <CollapsibleNavHeader title={this.context.translations.getStarted} progressIndex={2}  scrollY={this.scrollY} tipIconVisible={false} />
        <Animated.View style={{flex: 1, paddingTop: containerPaddingTop}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.scrollY}}}],
                      { listener: (event) => {this.isHeaderShrunk = event.nativeEvent.contentOffset.y >= headerShrinkOffset}, useNativeDriver: false })}
            stickyHeaderIndices={[0]}
          >
            { this.renderTitle() }
            { this.renderParticipantList() }
            { this.props.participants.length == 0 && this.renderNoData() }
          </ScrollView>
        </Animated.View>
      </React.Fragment>
    )
  }
}

export default ParticipantMain;