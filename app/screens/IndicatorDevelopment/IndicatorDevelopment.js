import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Button, Text } from 'native-base';
import { Icon } from 'native-base';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import BottomButton from '../../components/BottomButton';
import ProposedCriteriaListModal from '../../components/IndicatorDevelopment/ProposedCriteriaListModal';
import SelectedCriteriaItem from '../../components/IndicatorDevelopment/SelectedCriteriaItem';

import Color from '../../themes/color';
import Tip from '../../components/Tip';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

import { setProposedCriterias } from '../../actions/proposedCriteriaAction';
import { setSelectedCriterias } from '../../actions/selectedCriteriaAction';
import { set } from '../../actions/currentScorecardAction';

import scorecardService from '../../services/scorecardService';
import votingCriteriaService from '../../services/votingCriteriaService';
import proposedCriteriaService from '../../services/proposedCriteriaService';

class IndicatorDevelopment extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      scorecard: scorecardService.find(props.route.params.scorecard_uuid),
    };
  }

  componentDidMount() {
    if (this.state.scorecard.status < 3) {
      scorecardService.update(this.state.scorecard.uuid, {status: '3'});
      this.props.setCurrentScorecard(this.state.scorecard);
    }

    let selectedTags = votingCriteriaService.getSelectedTags(this.state.scorecard.uuid);
    let proposedCriterias = proposedCriteriaService.getProposedCriterias(this.state.scorecard.uuid);
    let selectedCriterias = proposedCriterias.filter(x => selectedTags.includes(x.tag));
    proposedCriterias = proposedCriterias.filter(x => !selectedTags.includes(x.tag));

    this.props.setSelectedCriterias(selectedCriterias);
    this.props.setProposedCriterias(proposedCriterias);
  }

  _renderHeader() {
    const { translations } = this.context;

    return (
      <HorizontalProgressHeader
        title={translations.setIndicatorDevelopment}
        navigation={this.props.navigation}
        progressIndex={2}/>
    )
  }

  _submit() {
    votingCriteriaService.submitCriterias(this.state.scorecard.uuid, this.props.selectedCriterias);

    this.props.navigation.navigate('VotingCriteriaList', { scorecard_uuid: this.state.scorecard.uuid });
  }

  _renderSelectedCriterias() {
    let doms = this.props.selectedCriterias.map((criteria, index) => <SelectedCriteriaItem criteria={criteria} key={index}/>);
    return (
      <View>
        {doms}
      </View>
    )
  }

  _renderNoData() {
    const { translations } = this.context;

    return (
      <View style={{alignItems: 'center', marginTop: 30}}>
        <Icon name={'document-outline'} style={{fontSize: 100, color: "#e1e0e1"}} />
        <Text style={{fontSize: 24, marginVertical: 10}}>{translations.pleaseAddCriteria}</Text>
        <View>
          { this._renderBtnAddCriteria() }
        </View>
      </View>
    );
  }

  _renderBtnAddCriteria() {
    const { translations } = this.context;

    return (
      <Button
        bordered
        onPress={() => this.setState({visibleModal: true}) }
        iconLeft>
        <Icon name={'plus'} type="FontAwesome" style={{color: Color.headerColor}} />
        <Text style={{color: Color.headerColor}}>{translations.criteria}</Text>
      </Button>
    )
  }

  _renderContent() {
    const { translations } = this.context;
    const hasData = !!this.props.selectedCriterias.length;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.h1, {flex: 1}]}>{ translations.indicatorDevelopment }</Text>

          { hasData && this._renderBtnAddCriteria() }
        </View>

        { !hasData && this._renderNoData() }

        { hasData && this._renderSelectedCriterias() }
      </View>
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        { this._renderHeader() }

        <ScrollView style={styles.container}>
          <Tip screenName={'IndicatorDevelopment'}/>

          { this._renderContent() }
        </ScrollView>

        { !!this.props.selectedCriterias.length &&
          <View style={{padding: 20}}>
            <BottomButton
              onPress={ () => this._submit() }
              customBackgroundColor={Color.headerColor}
              label={translations.saveAndGoNext}/>
          </View>
        }

        <ProposedCriteriaListModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
        />
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
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndicatorDevelopment);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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
