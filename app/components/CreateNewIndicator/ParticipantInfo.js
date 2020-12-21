import React, {Component} from 'react';
import { View, TouchableOppacity } from 'react-native';

import realm from '../../db/schema';
import { LocalizationContext } from '../../components/Translations';
import { Icon, Button, Text } from 'native-base';

import ParticipantModal from '../../components/RaisingProposed/ParticipantModal';
import AddNewParticiantModal from '../../components/RaisingProposed/AddNewParticipantModal';
import ParticipantModalListItem from '../../components/RaisingProposed/ParticipantModalListItem';
import Color from '../../themes/color';

export default class ParticipantInfo extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      participants: props.participants || [],
      participantVisible: false,
      addParticiantVisible: false,
      currentParticipant: realm.objects('Participant').filtered(`uuid == '${props.participant_uuid}'`)[0],
    };
  }

  _renderParticipant() {
    const { translations } = this.context;
    const { mode } = this.props;

    if (!!mode && mode.type == 'button') {
      return (
        <Button
          bordered
          onPress={() => this.setState({participantVisible: true}) }
          iconLeft>
          <Icon name={mode.iconName || 'plus'} type="FontAwesome" style={{color: Color.headerColor}} />
          <Text style={{color: Color.headerColor}}>{mode.label}</Text>
        </Button>
      )
    }

    return (
      <ParticipantModalListItem
        participant={this.state.currentParticipant}
        translations={translations}
        onPress={() => this.setState({participantVisible: true}) }
      />
    )
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

  render() {
    return (
      <View>
        { this._renderParticipant() }

        <ParticipantModal
          participants={this.state.participants || []}
          visible={this.state.participantVisible}
          scorecardUuid={this.props.scorecard_uuid}
          navigation={this.props.navigation}
          onDismiss={() => this.setState({participantVisible: false})}
          showAddParticipantModal={() => this._showAddParticipantModal()}
          onPressItem={(participant) => this._onPressItem(participant) }
        />

        <AddNewParticiantModal
          visible={ this.state.addParticipantVisible }
          onDismiss={ () => this.setState({addParticipantVisible: false}) }
          onClose={ () => this._hideAddParticipantModal() }
          scorecardUuid={ this.props.scorecard_uuid }
          navigation={ this.props.navigation }
          onSaveParticipant={ (participant) => this._onCreateNewParticipant(participant) }
        />
      </View>
    );
  }
}
