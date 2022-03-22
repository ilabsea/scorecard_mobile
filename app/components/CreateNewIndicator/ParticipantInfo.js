import React, {Component} from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import ParticipantModalListItem from '../ParticipantModal/ParticipantModalListItem';
import ParticipantListContent from '../ParticipantModal/ParticipantListContent';
import AddNewParticipantContent from '../ParticipantModal/AddNewParticipantContent';

import OutlinedButton from '../OutlinedButton';
import Participant from '../../models/Participant';
import { INDICATOR_BASE } from '../../constants/main_constant';
import { navigate } from '../../navigators/app_navigator';
import { getProposedIndicatorMethod } from '../../utils/proposed_indicator_util';

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

    this.isComponentUnmounted = false;
  }

  componentWillUnmount() {
    this.isComponentUnmounted = true;
  }

  componentDidUpdate() {
    if (this.isComponentUnmounted)
      return;

    this.checkAndCloseModal();
    this.checkAndOpenParticipantList();

    if (this.state.participantUuid != this.props.participantUuid) {
      this.setState({ 
        currentParticipant: Participant.find(this.props.participantUuid),
        participantUuid: this.props.participantUuid
      });
    }
  }

  checkAndCloseModal() {
    // If either participantListVisible or addParticipantVisible is still true and the visibleModal is false, it means the modal is not closed yet
    if ((!!this.state.participantListVisible || !!this.state.addParticipantVisible ) && !this.props.visibleModal)
      this.setState({
        participantListVisible: false,
        addParticipantVisible: false,
      });
  }

  checkAndOpenParticipantList() {
    // If participantListVisible and addParticipantVisible are still false and the visibleModal is true, it means the modal is not opened yet
    if (!this.state.participantListVisible && !this.state.addParticipantVisible && this.props.visibleModal)
      this.openParticipantListModal();
  }

  async openParticipantListModal() {
    if (await getProposedIndicatorMethod() === INDICATOR_BASE)
      navigate('ProposedIndicatorByIndicatorBase', { scorecard_uuid: this.props.scorecard_uuid });
    else {
      this.setState({ participantListVisible: this.props.visibleModal })
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

  selectParticipant(participant) {
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
             onSelectParticipant={(participant) => this.selectParticipant(participant) }
           />
  }

  getAddNewParticipantContent() {
    return <AddNewParticipantContent
             scorecardUuid={ this.props.scorecardUuid }
             onSaveParticipant={ (participant) => this.selectParticipant(participant) }
           />
  }

  render() {
    return this._renderParticipant();
  }
}