import React, {Component} from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import ParticipantModalListItem from '../ParticipantModal/ParticipantModalListItem';
import ParticipantModalMain from '../ParticipantModal/ParticipantModalMain';
import AddNewParticipantMain from '../ParticipantModal/AddNewParticipantMain';

import OutlinedButton from '../OutlinedButton';
import Participant from '../../models/Participant';
import { INDICATOR_BASE } from '../../constants/main_constant';
import { navigate } from '../../navigators/app_navigator';
import { getProposedIndicatorMethod, isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import { isProposedIndicatorScreen } from '../../utils/screen_util';

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

  async openParticipantListModal() {
    if (await getProposedIndicatorMethod() === INDICATOR_BASE && isProposedIndicatorScreen())
      navigate('CreateNewIndicator', { scorecard_uuid: this.props.scorecardUuid });
    else {
      this.setState({ participantListVisible: true });
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
    this.dismissModal();
    this.setState({currentParticipant: participant});
    !!this.props.selectParticipant && this.props.selectParticipant(participant);
  }

  showAddParticipantModal = () => {
    this.setState({
      participantVisible: false,
      addParticipantVisible: true,
    });

    this.props.formModalRef.current?.setBodyContent(this.getAddNewParticipantMain());
  }

  dismissModal() {
    this.setState({
      participantListVisible: false,
      addParticipantVisible: false,
    });

    !!this.props.closeModal && this.props.closeModal();
  }

  getParticipantListContent() {
    return <ParticipantModalMain
              title={this.props.title}
              scorecardUuid={this.props.scorecardUuid}
              participants={this.state.participants || []}
              selectedIndicator={null}
              isIndicatorBase={this.isIndicatorBase}
              showAddParticipantModal={() => this.showAddParticipantModal()}
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