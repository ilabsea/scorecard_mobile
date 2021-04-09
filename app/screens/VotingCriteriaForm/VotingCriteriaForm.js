import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getAll } from '../../actions/votingCriteriaAction';

import realm from '../../db/schema';
import Color from '../../themes/color';
import { LocalizationContext } from '../../components/Translations';

import BottomButton from '../../components/BottomButton';
import HeaderTitle from '../../components/HeaderTitle';
import CriteriaRatingItem from '../../components/VotingCriteria/CriteriaRatingItem';
import votingCriteriaService from '../../services/votingCriteriaService';

import ParticipantInfo from '../../components/CreateNewIndicator/ParticipantInfo';

import { getDeviceStyle, containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import VotingCriteriaFormTabletStyles from './styles/tablet/VotingCriteriaFormStyle';
import VotingCriteriaFormMobileStyles from './styles/mobile/VotingCriteriaFormStyle';

const responsiveStyles = getDeviceStyle(VotingCriteriaFormTabletStyles, VotingCriteriaFormMobileStyles);

class VotingCriteriaForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard_uuid = props.route.params.scorecard_uuid;

    this.state = {
      scorecard: { uuid: scorecard_uuid },
      criterias: JSON.parse(JSON.stringify(realm.objects('VotingCriteria').filtered(`scorecard_uuid = '${scorecard_uuid}'`))),
      isValid: false,
      participant_uuid: props.route.params.participant_uuid,
    };
  }

  componentWillUnmount() {
    votingCriteriaService.clearPlayingCriteria();
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
    return (
      this.state.criterias.map((criteria, index) => {
        return (
          <CriteriaRatingItem
            key={criteria.uuid}
            criteria={criteria}
            onPress={ (rating) => this.onClickRatingIcon(criteria, rating) }
            colIndex={index}
          />
        )
      })
    )
  }

  _renderParticipant() {
    return (
      <View>
        <HeaderTitle headline="addNewScorecardVoting" subheading="pleaseFillInformationBelow"/>

        <ParticipantInfo
          participants={realm.objects('Participant').filtered(`scorecard_uuid='${this.state.scorecard.uuid}' AND voted=false SORT(order ASC)`)}
          scorecard_uuid={ this.props.route.params.scorecard_uuid }
          participant_uuid={ this.props.route.params.participant_uuid }
          onGetParticipant={(participant) => this.setState({participant_uuid: participant.uuid})}
          navigation={this.props.navigation}
        />
      </View>
    )
  }

  _renderContent() {
    const { translations } = this.context;

    return (
      <ScrollView style={styles.container} contentContainerStyle={{padding: 16, paddingTop: getDeviceStyle(16, 10)}}>
        { this._renderParticipant() }

        <Text style={responsiveStyles.title}>{translations.pleaseSelect}</Text>

        { this._renderCriteriaRatingList() }
      </ScrollView>
    )
  }

  _submit() {
    const { participant_uuid } = this.state;

    votingCriteriaService.submitVoting(this.state.criterias, participant_uuid);

    realm.write(() => {
      realm.create('Participant', {uuid: participant_uuid, voted: true}, 'modified');
    });

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
      <View style={{height: '100%', backgroundColor: '#fff'}}>
        { this._renderContent() }
        { this._renderFooter() }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    refreshVotingCriteriaState: (scorecard_uuid) => dispatch(getAll(scorecard_uuid)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VotingCriteriaForm);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
