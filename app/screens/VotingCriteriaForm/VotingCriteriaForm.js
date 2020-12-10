import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getAll } from '../../actions/votingCriteriaAction';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import realm from '../../db/schema';
import Color from '../../themes/color';
import { LocalizationContext } from '../../components/Translations';

import ActionButton from '../../components/ActionButton';
import HeaderTitle from '../../components/HeaderTitle';
import CriteriaRatingItem from '../../components/VotingCriteria/CriteriaRatingItem';
import { Icon } from 'native-base';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import participantListItemStyle from '../../themes/participantListItemStyle';
import { submitVoting } from '../../services/votingCriteriaService';

class VotingCriteriaForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard_uuid = props.route.params.scorecard_uuid;

    this.state = {
      scorecard: { uuid: scorecard_uuid },
      participant: realm.objects('Participant').filtered(`uuid='${props.route.params.participant_uuid}'`)[0],
      criterias: JSON.parse(JSON.stringify(realm.objects('VotingCriteria').filtered(`scorecard_uuid = '${scorecard_uuid}'`))),
      isValid: false,
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
    return (
      this.state.criterias.map(criteria => {
        return (
          <CriteriaRatingItem
            key={criteria.uuid}
            criteria={criteria}
            onPress={ (rating) => this.onClickRatingIcon(criteria, rating) }
          />
        )
      })
    )
  }

  renderGender = (participant) => {
    if (participant === undefined) return (<Text style={{marginLeft: 20}}>---</Text>);

    if (participant.gender === '') {
      return (<MaterialIcon name="person" size={25} color="#b9b9b9" style={{paddingHorizontal: 10, marginLeft: 20}} />);
    }

    const gender = participant.gender === 'other' ? 'transgender' : participant.gender;
    return (<FontAwesomeIcon name={gender} size={25} style={{paddingHorizontal: 10, marginLeft: 20}} color="black" />);
  };

  _renderParticipant() {
    const { translations } = this.context;
    const { participant } = this.state;
    let columns = ['disability', 'minority', 'poor', 'youth'];
    let description = [];

    for(let i=0; i<columns.length; i++) {
      if(participant[columns[i]]) {
        description.push(translations[columns[i]]);
      }
    }
    description = description.join('; ');

    return (
      <View style={participantListItemStyle.participantItem}>
        <View style={participantListItemStyle.numberContainer}>
          <Text style={participantListItemStyle.numberLabel}>{participant.order+1}</Text>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>
          { this.renderGender(participant) }
          <Text style={{marginLeft: 20}}>{participant.age}</Text>
          <Text style={{marginLeft: 20}}>{description}</Text>
        </View>
      </View>
    )
  }

  _renderContent() {
    const { translations } = this.context;

    return (
      <ScrollView style={styles.container} contentContainerStyle={{padding: 20}}>
        <HeaderTitle headline="addNewScorecardVoting" subheading="pleaseFillInformationBelow"/>
        { this._renderParticipant() }

        <Text style={{marginTop: 30, marginBottom: -10, fontSize: 20}}>{translations.pleaseSelect}</Text>

        { this._renderCriteriaRatingList() }
      </ScrollView>
    )
  }

  _submit() {
    const { participant } = this.state;

    submitVoting(this.state.criterias, participant.uuid);

    realm.write(() => {
      realm.create('Participant', {uuid: participant.uuid, voted: true}, 'modified');
    });

    this.props.refreshVotingCriteriaState(this.state.scorecard.uuid);
    this.props.navigation.goBack();
  }

  _renderFooter() {
    const { translations } = this.context;

    return (
      <View style={{padding: 20}}>
        <ActionButton
          onPress={() => this._submit() }
          customBackgroundColor={Color.headerColor}
          isDisabled={!this.state.isValid}
          label={translations.save}/>
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
