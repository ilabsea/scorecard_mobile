import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Text } from 'native-base';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import BottomButton from '../../components/BottomButton';
import ProposedCriteriaListModal from '../../components/IndicatorDevelopment/ProposedCriteriaListModal';
import SelectedCriteriaItem from '../../components/IndicatorDevelopment/SelectedCriteriaItem';
import NoDataMessage from '../../components/NoDataMessage';
import OutlinedButton from '../../components/OutlinedButton';

import Color from '../../themes/color';
import Tip from '../../components/Tip';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

import { setProposedCriterias } from '../../actions/proposedCriteriaAction';
import { setSelectedCriterias } from '../../actions/selectedCriteriaAction';
import { set } from '../../actions/currentScorecardAction';

import Scorecard from '../../models/Scorecard';
import votingCriteriaService from '../../services/votingCriteriaService';
import proposedCriteriaService from '../../services/proposedCriteriaService';

import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import IndicatorDevelopmentTabletStyles from '../../styles/tablet/IndicatorDevelopmentScreenStyle';
import IndicatorDevelopmentMobileStyles from '../../styles/mobile/IndicatorDevelopmentScreenStyle';

const responsiveStyles = getDeviceStyle(IndicatorDevelopmentTabletStyles, IndicatorDevelopmentMobileStyles);

class IndicatorDevelopment extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
    };
  }

  componentDidMount() {
    if (this.state.scorecard.status < 3) {
      Scorecard.update(this.state.scorecard.uuid, {status: '3'});
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
    let selectedCriterias = this.props.selectedCriterias.filter(criteria => criteria.scorecard_uuid == this.props.route.params.scorecard_uuid);
    let doms = selectedCriterias.map((criteria, index) => <SelectedCriteriaItem criteria={criteria} key={index}/>);

    return (
      <View>
        {doms}
      </View>
    )
  }

  _renderNoData() {
    const { translations } = this.context;

    return (
      <NoDataMessage
        title={translations.pleaseAddCriteria}
        buttonLabel={translations.criteria}
        onPress={() => this.setState({visibleModal: true}) }
        customContainerStyle={{marginTop: -30}}
      />
    );
  }

  _renderBtnAddCriteria() {
    const { translations } = this.context;

    return (
      <OutlinedButton
        icon="plus"
        label={translations.addNew}
        onPress={() => this.setState({visibleModal: true}) }
      />
    )
  }

  _renderContent() {
    const { translations } = this.context;
    const hasData = !!this.props.selectedCriterias.length;

    return (
      <View style={{flex: 1}}>
        <View style={responsiveStyles.titleContainer}>
          <Text style={[styles.h1, responsiveStyles.titleLabel]}>{ translations.indicatorDevelopment }</Text>

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

        <ScrollView contentContainerStyle={styles.container}>
          <Tip screenName={'IndicatorDevelopment'}/>

          { this._renderContent() }
        </ScrollView>

        { !!this.props.selectedCriterias.length &&
          <View style={{padding: containerPadding}}>
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
    padding: containerPadding,
    flexGrow: 1,
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
