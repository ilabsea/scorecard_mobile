import React, {Component} from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import ParticipantModal from '../RaisingProposed/ParticipantModal';
import AddNewParticiantModal from '../RaisingProposed/AddNewParticipantModal';
import ParticipantModalListItem from '../RaisingProposed/ParticipantModalListItem';

import ParticipantListContent from '../ParticipantModal/ParticipantListContent';
import AddNewParticipantContent from '../ParticipantModal/AddNewParticipantContent';

import OutlinedButton from '../OutlinedButton';
import Participant from '../../models/Participant';

export default class ParticipantInfo extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      participants: props.participants || [],
      participantVisible: false,
      addParticipantVisible: false,
      currentParticipant: Participant.find(props.participant_uuid),
      participantUuid: props.participant_uuid,
    };
  }

  componentDidUpdate() {
    if ((!!this.state.participantVisible || !!this.state.addParticipantVisible ) && !this.props.visibleModal)
      this.setState({
        participantVisible: false,
        addParticipantVisible: false,
      });

    if (!this.state.participantVisible && !this.state.addParticipantVisible && this.props.visibleModal) {
      this.setState({ participantVisible: this.props.visibleModal })
      this.props.modalRef.current?.setBodyContent(this.getParticipantListContent());

      setTimeout(() => {
        this.props.participantModalRef.current?.present();
      }, 50);
    }

    if (this.state.participantUuid != this.props.participant_uuid) {
      this.setState({ 
        currentParticipant: Participant.find(this.props.participant_uuid),
        participantUuid: this.props.participant_uuid
      });
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
          onPress={() => this.setState({participantVisible: true}) }
        />
      )
    }

    return this.props.buttonVisible ? 
      <OutlinedButton
        icon={mode.iconName || 'plus'}
        label={mode.label}
        onPress={() => this.setState({participantVisible: true}) }
      />
      :
      <View/>;
  }

  _showAddParticipantModal = () => {
    this.setState({
      participantVisible: false,
      addParticipantVisible: true,
    });

    this.props.modalRef.current?.setBodyContent(this.getAddNewParticipantContent());
  }

  _hideAddParticipantModal = () => {
    this.setState({
      addParticipantVisible: false,
      participantVisible: true,
    });
  }

  _onCreateNewParticipant(participant) {
    if (!!this.props.onPressCreateParticipant) {
      return this.props.onPressCreateParticipant(participant);
    }

    this.setState({
      currentParticipant: participant,
      addParticipantVisible: false
    });

    !!this.props.onGetParticipant && this.props.onGetParticipant(participant);
  }

  _onPressItem(participant) {
    if (!!this.props.onPressItem) {
      return this.props.onPressItem(participant);
    }

    this.setState({currentParticipant: participant, participantVisible: false});

    !!this.props.onGetParticipant && this.props.onGetParticipant(participant);
  }

  onDismissModal() {
    this.setState({
      participantVisible: false,
      addParticipantVisible: false,
    });

    !!this.props.closeModal && this.props.closeModal();
  }

  getParticipantListContent() {
    return <ParticipantListContent
             scorecardUuid={this.props.scorecard_uuid}
             participants={this.state.participants || []}
             onDismiss={() => this.onDismissModal()}
             showAddParticipantModal={() => this._showAddParticipantModal()}
             onPressItem={(participant) => this._onPressItem(participant) }
           />
  }

  getAddNewParticipantContent() {
    return <AddNewParticipantContent
             visible={ this.state.addParticipantVisible }
             onDismiss={() => this.onDismissModal()}
             onClose={ () => this._hideAddParticipantModal() }
             scorecardUuid={ this.props.scorecard_uuid }
             onSaveParticipant={ (participant) => this._onCreateNewParticipant(participant) }
           />
  }

  render() {
    return (
      <View>
        { this._renderParticipant() }

        {/* <ParticipantModal
          participants={this.state.participants || []}
          visible={this.state.participantVisible}
          scorecardUuid={this.props.scorecard_uuid}
          onDismiss={() => this.onDismissModal()}
          showAddParticipantModal={() => this._showAddParticipantModal()}
          onPressItem={(participant) => this._onPressItem(participant) }
          participantModalRef={this.props.participantModalRef}
        /> */}

        {/* <AddNewParticiantModal
          visible={ this.state.addParticipantVisible }
          onDismiss={() => this.onDismissModal()}
          onClose={ () => this._hideAddParticipantModal() }
          scorecardUuid={ this.props.scorecard_uuid }
          onSaveParticipant={ (participant) => this._onCreateNewParticipant(participant) }
        /> */}
      </View>
    );
  }
}
