import React, {Component} from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAll } from '../../actions/votingCriteriaAction';

import Color from '../../themes/color';
import { navigationRef } from '../../navigators/app_navigator';
import { LocalizationContext } from '../../components/Translations';
import BottomButton from '../../components/BottomButton';
import NavigationHeader from '../../components/NavigationHeader';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';
import VotingIndicatorFormParticipantInfo from '../../components/VotingIndicatorForm/VotingIndicatorFormParticipantInfo';
import VotingIndicatorFormRatingList from '../../components/VotingIndicatorForm/VotingIndicatorFormRatingList';

import votingCriteriaService from '../../services/votingCriteriaService';
import VotingCriteria from '../../models/VotingCriteria';
import Participant from '../../models/Participant';
import { participantModalSnapPoints } from '../../constants/modal_constant';

import { getDeviceStyle, containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import VotingCriteriaFormTabletStyles from '../../styles/tablet/VotingCriteriaFormScreenStyle';
import VotingCriteriaFormMobileStyles from '../../styles/mobile/VotingCriteriaFormScreenStyle';

const responsiveStyles = getDeviceStyle(VotingCriteriaFormTabletStyles, VotingCriteriaFormMobileStyles);

class VotingCriteriaForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard_uuid = props.route.params.scorecard_uuid;

    this.state = {
      scorecard: { uuid: scorecard_uuid },
      criterias: JSON.parse(JSON.stringify(VotingCriteria.getAll(scorecard_uuid))),
      isValid: false,
      participant_uuid: props.route.params.participant_uuid,
    };

    this.participantModalRef = React.createRef();
    this.formRef = React.createRef();
  }

  componentWillUnmount() {
    votingCriteriaService.clearPlayingCriteria();

    this.setState = (state, callback) => {
      return;
    };
  }

  onClickRatingIcon(criteria, rating) {
    criteria.ratingScore = rating.value;

    this._checkValidForm();
  }

  _checkValidForm() {
    let isValid = Object.values(this.state.criterias).every(criteria => !!criteria.ratingScore);

    if(isValid) {
      this.setState({isValid: true});
    }
  }

  _renderCriteriaRatingList() {
    return <VotingIndicatorFormRatingList
             criterias={this.state.criterias}
             onClickRatingIcon={(criteria, rating) => this.onClickRatingIcon(criteria, rating)}
           />
  }

  _renderParticipant() {
    return <VotingIndicatorFormParticipantInfo
              scorecardUuid={this.props.route.params.scorecard_uuid}
              participantUuid={this.props.route.params.participant_uuid}
              participantModalRef={this.participantModalRef}
              formModalRef={this.formRef}
              onGetParticipant={(participantUuid) => this.setState({participant_uuid: participantUuid})}
            />
  }

  _renderContent() {
    const { translations } = this.context;

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1, padding: 10, paddingTop: getDeviceStyle(16, 10), paddingHorizontal: 0}}>
        { this._renderParticipant() }

        <Text style={[{ paddingHorizontal: getDeviceStyle(16, 10) }, responsiveStyles.title]}>{translations.pleaseSelect}</Text>

        { this._renderCriteriaRatingList() }
      </ScrollView>
    )
  }

  _submit() {
    const { participant_uuid } = this.state;

    votingCriteriaService.submitVoting(this.state.criterias, participant_uuid);
    Participant.update(participant_uuid, { voted: true });
    this.props.refreshVotingCriteriaState(this.state.scorecard.uuid);
    this.props.navigation.goBack();
  }

  _renderFooter() {
    const { translations } = this.context;

    return (
      <View style={{padding: containerPadding, paddingTop: containerPaddingTop}}>
        <BottomButton
          onPress={() => this._submit()}
          customBackgroundColor={Color.headerColor}
          disabled={!this.state.isValid}
          label={translations.save}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.whiteColor}}>
        <NavigationHeader title={this.context.translations.scorecardVoting} onBackPress={() => navigationRef.current?.goBack()} />
        { this._renderContent() }
        { this._renderFooter() }
        <FormBottomSheetModal ref={this.formRef} formModalRef={this.participantModalRef} snapPoints={participantModalSnapPoints} />
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    refreshVotingCriteriaState: (scorecard_uuid) => dispatch(getAll(scorecard_uuid)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(VotingCriteriaForm);