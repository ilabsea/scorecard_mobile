import React, {Component} from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import ParticipantModalListItem from '../ParticipantModal/ParticipantModalListItem';
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
      participantListVisible: false,
      addParticipantVisible: false,
      currentParticipant: Participant.find(props.participantUuid),
      participantUuid: props.participantUuid,
    };
  }

  componentDidUpdate() {
    if (this.isModalNotClosed())
      this.setState({
        participantListVisible: false,
        addParticipantVisible: false,
      });

    if (this.isModalNotOpened())
      this.openParticipantListModal();

    if (this.state.participantUuid != this.props.participantUuid) {
      this.setState({ 
        currentParticipant: Participant.find(this.props.participantUuid),
        participantUuid: this.props.participantUuid
      });
    }
  }

  isModalNotClosed() {
    // If either participantListVisible or addParticipantVisible is still true and the visibleModal is false,
    // it means the modal is not closed yet
    return (!!this.state.participantListVisible || !!this.state.addParticipantVisible ) && !this.props.visibleModal;
  }

  isModalNotOpened() {
    // If participantListVisible and addParticipantVisible are still false and the visibleModal is true,
    // it means the modal is not opened yet
    return !this.state.participantListVisible && !this.state.addParticipantVisible && this.props.visibleModal;
  }

  openParticipantListModal() {
    this.setState({ participantListVisible: this.props.visibleModal })
    this.props.formModalRef.current?.setBodyContent(this.getParticipantListContent());

    setTimeout(() => {
      this.props.participantModalRef.current?.present();
    }, 50);
  }

  _renderParticipant() {
    const { translations } = this.context;
    const { mode } = this.props;

    if (!mode) {
      return (
        <ParticipantModalListItem
          participant={this.state.currentParticipant}
          translations={translations}
          onPress={() => this.openParticipantListModal()}
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

  // start of add new participant functions
  onSaveParticipant(participant) {
    this.dismissModal();

    if (!!this.props.selectParticipant)
      return this.props.selectParticipant(participant);

    this.setState({ currentParticipant: participant });
    !!this.props.onGetParticipant && this.props.onGetParticipant(participant);
  }
  // end of add new participant functions

  // start of participant list functions
  onSelectParticipant(participant) {
    this.dismissModal();

    if (!!this.props.selectParticipant)
      return this.props.selectParticipant(participant);

    this.setState({currentParticipant: participant});
    !!this.props.onGetParticipant && this.props.onGetParticipant(participant);
  }

  showAddParticipantModal = () => {
    this.setState({
      participantVisible: false,
      addParticipantVisible: true,
    });

    this.props.formModalRef.current?.setBodyContent(this.getAddNewParticipantContent());
  }
  // end of participant list functions

  dismissModal() {
    this.setState({
      participantListVisible: false,
      addParticipantVisible: false,
    });

    !!this.props.closeModal && this.props.closeModal();
  }

  getParticipantListContent() {
    return <ParticipantListContent
             scorecardUuid={this.props.scorecardUuid}
             participants={this.state.participants || []}
             showAddParticipantModal={() => this.showAddParticipantModal()}
             onSelectParticipant={(participant) => this.onSelectParticipant(participant) }
           />
  }

  getAddNewParticipantContent() {
    return <AddNewParticipantContent
             scorecardUuid={ this.props.scorecardUuid }
             onSaveParticipant={ (participant) => this.onSaveParticipant(participant) }
           />
  }

  render() {
    return this._renderParticipant();
  }
}