import React, {Component} from 'react';
import { View } from 'react-native';

import realm from '../../db/schema';
import { LocalizationContext } from '../../components/Translations';

import ParticipantModal from '../../components/RaisingProposed/ParticipantModal';
import AddNewParticiantModal from '../../components/RaisingProposed/AddNewParticipantModal';
import ParticipantModalListItem from '../../components/RaisingProposed/ParticipantModalListItem';
import OutlinedButton from '../OutlinedButton';

export default class ParticipantInfo extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      participants: props.participants || [],
      participantVisible: false,
      addParticipantVisible: false,
      currentParticipant: realm.objects('Participant').filtered(`uuid == '${props.participant_uuid}'`)[0],
    };
  }

  componentDidUpdate() {
    if (!this.state.participantVisible && this.props.visibleModal)
      this.setState({ participantVisible: this.props.visibleModal })
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

  render() {
    return (
      <View>
        { this._renderParticipant() }

        <ParticipantModal
          participants={this.state.participants || []}
          visible={this.state.participantVisible}
          scorecardUuid={this.props.scorecard_uuid}
          navigation={this.props.navigation}
          onDismiss={() => this.onDismissModal()}
          showAddParticipantModal={() => this._showAddParticipantModal()}
          onPressItem={(participant) => this._onPressItem(participant) }
        />

        <AddNewParticiantModal
          visible={ this.state.addParticipantVisible }
          onDismiss={() => this.onDismissModal()}
          onClose={ () => this._hideAddParticipantModal() }
          scorecardUuid={ this.props.scorecard_uuid }
          navigation={ this.props.navigation }
          onSaveParticipant={ (participant) => this._onCreateNewParticipant(participant) }
        />
      </View>
    );
  }
}
