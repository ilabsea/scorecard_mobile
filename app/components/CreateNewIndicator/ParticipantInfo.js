import React, {Component} from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import ParticipantModalListItem from '../ParticipantModal/ParticipantModalListItem';
import ParticipantModalMain from '../ParticipantModal/ParticipantModalMain';
import AddNewParticipantMain from '../ParticipantModal/AddNewParticipantMain';

import OutlinedButton from '../OutlinedButton';
import Participant from '../../models/Participant';
import { navigate } from '../../navigators/app_navigator';
import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import { isProposedIndicatorScreen } from '../../utils/screen_util';
import { participantModalSnapPoints } from '../../constants/modal_constant';

export default class ParticipantInfo extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      participants: props.participants || [],
      currentParticipant: Participant.find(props.participantUuid),
      participantUuid: props.participantUuid,
    };

    this.isComponentUnmounted = false;
  }

  async componentDidMount() {
    this.isIndicatorBase = await isProposeByIndicatorBase();
  }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  componentDidUpdate() {
    if (this.isComponentUnmounted)
      return;

    if (this.state.participantUuid != this.props.participantUuid) {
      this.setState({
        currentParticipant: Participant.find(this.props.participantUuid),
        participantUuid: this.props.participantUuid
      });
    }
  }

  openParticipantListModal() {
    if (this.isIndicatorBase && isProposedIndicatorScreen())
      navigate('ProposeNewIndicator', { scorecard_uuid: this.props.scorecardUuid });
    else {
      this.props.formModalRef.current?.setSnapPoints(participantModalSnapPoints);
      this.props.formModalRef.current?.setBodyContent(this.getParticipantListContent());

      setTimeout(() => {
        this.props.participantModalRef.current?.present();
      }, 50);
    }
  }

  _renderParticipant() {
    const { translations } = this.context;
    const { mode } = this.props;

    if (!mode) {
      return (
        <ParticipantModalListItem
          participant={this.state.currentParticipant}
          translations={translations}
          onPress={() => !this.props.isDisabled && this.openParticipantListModal()}
          hasArrowIcon={true}
        />
      )
    }

    return this.props.buttonVisible ?
      <View>
        <OutlinedButton
          icon={mode.iconName || 'plus'}
          label={mode.label}
          onPress={() => this.openParticipantListModal()}
        />
      </View>
      :
      <View/>;
  }

  selectParticipant(participant) {
    !!this.props.closeModal && this.props.closeModal();
    this.setState({currentParticipant: participant});
    !!this.props.selectParticipant && this.props.selectParticipant(participant);
  }

  getParticipantListContent() {
    return <ParticipantModalMain
              title={this.props.title}
              scorecardUuid={this.props.scorecardUuid}
              participants={this.state.participants || []}
              selectedIndicator={null}
              isIndicatorBase={this.isIndicatorBase}
              showAddParticipantModal={() =>  this.props.formModalRef.current?.setBodyContent(this.getAddNewParticipantMain())}
              selectParticipant={(participant) => this.selectParticipant(participant)}
              participantModalRef={this.props.participantModalRef}
           />
  }

  getAddNewParticipantMain() {
    return <AddNewParticipantMain
             title={this.props.title}
             scorecardUuid={ this.props.scorecardUuid }
             onSaveParticipant={ (participant) => this.selectParticipant(participant) }
           />
  }

  render() {
    return this._renderParticipant();
  }
}