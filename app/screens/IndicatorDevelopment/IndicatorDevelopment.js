import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { Icon } from 'native-base';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import realm from '../../db/schema';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import BottomButton from '../../components/BottomButton';
import Color from '../../themes/color';
import Tip from '../../components/Tip';

import ProposedCriteriaList from '../../components/IndicatorDevelopment/ProposedCriteriaList';
import SelectedCriteriaList from '../../components/IndicatorDevelopment/SelectedCriteriaList';
import CriteriaModal from '../../components/IndicatorDevelopment/CriteriaModal';

import { setProposedCriterias } from '../../actions/proposedCriteriaAction';
import { setSelectedCriterias } from '../../actions/selectedCriteriaAction';
import { submitCriterias } from '../../services/selectedCriteriaService';

import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

class IndicatorDevelopment extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scorecard: realm.objects('Scorecard').filtered(`uuid='${props.route.params.scorecard_uuid}'`)[0]
    };
  }

  componentDidMount() {
    realm.write(() => {
      if (this.state.scorecard.status < 3) {
        this.state.scorecard.status = '3';
      }
    });

    let selectedCriterias = JSON.parse(JSON.stringify(realm.objects('VotingCriteria').filtered(`scorecard_uuid='${this.state.scorecard.uuid}'`)));
    let selectedTags = selectedCriterias.map(x => x.tag);
    let proposedCriterias = this._getProposedCriteria();

    selectedCriterias = proposedCriterias.filter(x => selectedTags.includes(x.tag));
    proposedCriterias = proposedCriterias.filter(x => !selectedTags.includes(x.tag));

    this.props.setSelectedCriterias(selectedCriterias);
    this.props.setProposedCriterias(proposedCriterias);
  }

  _getProposedCriteria() {
    let allCriterias = realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${this.state.scorecard.uuid}'`);
    let criterias = JSON.parse(JSON.stringify(realm.objects('ProposedCriteria').filtered(`scorecard_uuid='${this.state.scorecard.uuid}' DISTINCT(tag)`)));
    criterias.map(criteria => criteria.count = allCriterias.filter(x => x.tag == criteria.tag).length);

    return criterias;
  }

  _renderHeader() {
    return (
      <HorizontalProgressHeader
        title={this.state.scorecard.name}
        navigation={this.props.navigation}
        progressIndex={2}/>
    )
  }

  _submit() {
    submitCriterias(this.state.scorecard.uuid, this.props.selectedCriterias);

    this.props.navigation.navigate('VotingCriteriaList', { scorecard_uuid: this.state.scorecard.uuid });
  }

  _onPressRemoveAll() {
    this.props.setSelectedCriterias([]);
    this.props.setProposedCriterias(this._getProposedCriteria());
  }

  _renderContent() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        <Text style={styles.h1}>{ translations.proposedCriteria }</Text>

        <View style={styles.listWrapper}>
          <ProposedCriteriaList />

          <View style={{width: 20}}></View>

          <SelectedCriteriaList onPressRemoveAll={() => this._onPressRemoveAll()}/>
        </View>

        <BottomButton
          onPress={ () => this._submit() }
          customBackgroundColor={Color.headerColor}
          label={translations.next}/>
      </View>
    )
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        { this._renderHeader() }

        <View style={styles.container}>
          <Tip screenName={'IndicatorDevelopment'}/>

          { this._renderContent() }
        </View>

        <CriteriaModal/>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedCriterias: state.selectedCriterias,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedCriterias: (criterias) => dispatch(setSelectedCriterias(criterias)),
    setProposedCriterias: (criterias) => dispatch(setProposedCriterias(criterias)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndicatorDevelopment);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  h1: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20
  },
  listWrapper: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20
  }
})
