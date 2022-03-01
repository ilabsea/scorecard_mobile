import React, {Component} from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import BottomButton from '../../components/BottomButton';
import ProposedIndicatorListModal from '../../components/IndicatorDevelopment/ProposedIndicatorListModal';
import IndicatorDevelopmentContent from '../../components/IndicatorDevelopment/IndicatorDevelopmentContent';
import TipModal from '../../components/Tip/TipModal';

import Color from '../../themes/color';
import { setProposedIndicators } from '../../actions/proposedIndicatorAction';
import { setSelectedIndicators } from '../../actions/selectedIndicatorAction';
import { set } from '../../actions/currentScorecardAction';
import { setVotingCriterias } from '../../actions/votingCriteriaAction';

import Scorecard from '../../models/Scorecard';
import votingCriteriaService from '../../services/votingCriteriaService';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import { containerPadding } from '../../utils/responsive_util';

class IndicatorDevelopment extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
    };

    this.tipModalRef = React.createRef();
  }

  componentDidMount() {
    if (this.state.scorecard.status < 3) {
      Scorecard.update(this.state.scorecard.uuid, {status: '3'});
      this.props.setCurrentScorecard(this.state.scorecard);
    }

    this.updateIndicatorsData();
  }

  componentWillUnmount() {
    this.updateIndicatorsData()
  }

  updateIndicatorsData() {
    const selectedIndicatorableIds = votingCriteriaService.getSelectedIndicatorableIds(this.state.scorecard.uuid);
    let proposedIndicators = proposedIndicatorService.getProposedIndicators(this.state.scorecard.uuid);
    const selectedIndicators = proposedIndicatorService.getSelectedProposedIndicators(this.state.scorecard.uuid, selectedIndicatorableIds);

    proposedIndicators = proposedIndicators.filter(x => !selectedIndicatorableIds.includes(x.indicatorable_id));

    this.props.setSelectedIndicators(selectedIndicators);
    this.props.setProposedIndicators(proposedIndicators);
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
    votingCriteriaService.submitCriterias(this.state.scorecard.uuid, this.props.selectedIndicators, (savedCriterias) => {
      this.props.setVotingCriterias(savedCriterias);
    });

    scorecardTracingStepsService.trace(this.state.scorecard.uuid, 6);
    this.props.navigation.navigate('VotingCriteriaList', { scorecard_uuid: this.state.scorecard.uuid });
  }

  _renderContent() {
    return (
      <IndicatorDevelopmentContent
        selectedCriterias={this.props.selectedIndicators}
        scorecardUuid={this.props.route.params.scorecard_uuid}
        openModal={() => this.setState({ visibleModal: true })}
        updateSelectedIndicatorsOrder={(indicators) => this.updateSelectedIndicatorsOrder(indicators)}
        navigation={this.props.navigation}
        tipModalRef={this.tipModalRef}
      />
    )
  }

  updateSelectedIndicatorsOrder(indicators) {
    if (!!indicators)
      this.props.setSelectedIndicators(indicators);
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        { this._renderHeader() }

        { this._renderContent() }

        { !!this.props.selectedIndicators.length &&
          <View style={{padding: containerPadding}}>
            <BottomButton
              onPress={ () => this._submit() }
              customBackgroundColor={Color.headerColor}
              label={translations.saveAndGoNext}/>
          </View>
        }

        <TipModal tipModalRef={this.tipModalRef} snapPoints={['32.5%']} screenName='IndicatorDevelopment' />

        <ProposedIndicatorListModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedIndicators: state.selectedIndicators,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedIndicators: (indicators) => dispatch(setSelectedIndicators(indicators)),
    setProposedIndicators: (indicators) => dispatch(setProposedIndicators(indicators)),
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
    setVotingCriterias: (criterias) => dispatch(setVotingCriterias(criterias)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndicatorDevelopment);