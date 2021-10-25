import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import BottomButton from '../../components/BottomButton';
import ProposedCriteriaListModal from '../../components/IndicatorDevelopment/ProposedCriteriaListModal';
import IndicatorDevelopmentContent from '../../components/IndicatorDevelopment/IndicatorDevelopmentContent';

import Color from '../../themes/color';

import { setProposedCriterias } from '../../actions/proposedCriteriaAction';
import { setSelectedCriterias } from '../../actions/selectedCriteriaAction';
import { set } from '../../actions/currentScorecardAction';
import { setVotingCriterias } from '../../actions/votingCriteriaAction';

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

    let selectedIndicatorableIds = votingCriteriaService.getSelectedIndicatorableIds(this.state.scorecard.uuid);
    let proposedCriterias = proposedCriteriaService.getProposedCriterias(this.state.scorecard.uuid);
    let selectedCriterias = proposedCriterias.filter(x => selectedIndicatorableIds.includes(x.indicatorable_id));
    proposedCriterias = proposedCriterias.filter(x => !selectedIndicatorableIds.includes(x.indicatorable_id));

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
    // console.log('selected Criterias == ', this.props.selectedCriterias)
    votingCriteriaService.submitCriterias(this.state.scorecard.uuid, this.props.selectedCriterias, (savedCriterias) => {
      this.props.setVotingCriterias(savedCriterias);
    });

    this.props.navigation.navigate('VotingCriteriaList', { scorecard_uuid: this.state.scorecard.uuid });
  }

  _renderContent() {
    // TO DO: update selectedCriterias props only when user click button NEXT in order to prevent the user from getting the new order without updating the order of voting criterias in realm
    return (
      <IndicatorDevelopmentContent
        selectedCriterias={this.props.selectedCriterias}
        scorecardUuid={this.props.route.params.scorecard_uuid}
        openModal={() => this.setState({ visibleModal: true })}
        updateSelectedCriteriasOrder={(criterias) => this.props.setSelectedCriterias(criterias)}
      />
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        { this._renderHeader() }

        <View style={styles.container}>
          { this._renderContent() }
        </View>

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
    setVotingCriterias: (criterias) => dispatch(setVotingCriterias(criterias)),
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
})