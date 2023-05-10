import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import BottomButton from '../../components/BottomButton';
import ProposedIndicatorListModalContent from '../../components/IndicatorDevelopment/ProposedIndicatorListModalContent';
import IndicatorDevelopmentContent from '../../components/IndicatorDevelopment/IndicatorDevelopmentContent';
import TipModal from '../../components/Tip/TipModal';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';

import Color from '../../themes/color';
import { setProposedIndicators } from '../../actions/proposedIndicatorAction';
import { setSelectedIndicators } from '../../actions/selectedIndicatorAction';
import { set } from '../../actions/currentScorecardAction';
import { setVotingIndicators } from '../../actions/votingIndicatorAction';

import Scorecard from '../../models/Scorecard';
import votingIndicatorService from '../../services/voting_indicator_service';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import { containerPadding } from '../../utils/responsive_util';
import { tipModalSnapPoints, INDICATOR_DEVELOPMENT, indicatorDevelopmentModalSnapPoints } from '../../constants/modal_constant';

class IndicatorDevelopment extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
      playingUuid: null
    };

    this.tipModalRef = React.createRef();
    this.indicatorListModalRef = React.createRef();
    this.formRef = React.createRef();
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
    const selectedIndicatorableIds = votingIndicatorService.getSelectedIndicatorableIds(this.state.scorecard.uuid);
    let proposedIndicators = proposedIndicatorService.getProposedIndicators(this.state.scorecard.uuid);
    const selectedIndicators = proposedIndicatorService.getSelectedProposedIndicators(this.state.scorecard.uuid, selectedIndicatorableIds);

    proposedIndicators = proposedIndicators.filter(x => !selectedIndicatorableIds.includes(x.indicatorable_id));

    this.props.setSelectedIndicators(selectedIndicators);
    this.props.setProposedIndicators(proposedIndicators);
  }

  _submit() {
    this.setState({playingUuid: null});
    votingIndicatorService.submitIndicators(this.state.scorecard.uuid, this.props.selectedIndicators, (savedIndicators) => {
      this.props.setVotingIndicators(savedIndicators);
    });

    scorecardTracingStepsService.trace(this.state.scorecard.uuid, 6);
    this.props.navigation.navigate('VotingIndicatorList', { scorecard_uuid: this.state.scorecard.uuid });
  }

  openModal() {
    this.formRef.current?.setBodyContent(<ProposedIndicatorListModalContent scorecardUuid={this.state.scorecard.uuid} onDismiss={() => this.indicatorListModalRef.current?.dismiss()} />);
    setTimeout(() => {
      this.indicatorListModalRef.current?.present();
    }, 50);
  }

  _renderContent() {
    return (
      <IndicatorDevelopmentContent
        selectedIndicators={this.props.selectedIndicators}
        scorecardUuid={this.props.route.params.scorecard_uuid}
        openModal={() => this.openModal()}
        updateSelectedIndicatorsOrder={(indicators) => this.updateSelectedIndicatorsOrder(indicators)}
        navigation={this.props.navigation}
        tipModalRef={this.tipModalRef}
        playingUuid={this.state.playingUuid}
        updatePlayingUuid={(uuid) => this.setState({playingUuid: uuid})}
      />
    )
  }

  updateSelectedIndicatorsOrder(indicators) {
    if (!!indicators)
      this.props.setSelectedIndicators(indicators);
  }

  render() {
    const { translations } = this.context;
    const snapPoints = tipModalSnapPoints[INDICATOR_DEVELOPMENT];

    return (
      <View style={{flex: 1}}>
        { this._renderContent() }
        { !!this.props.selectedIndicators.length &&
          <View style={{padding: containerPadding}}>
            <BottomButton
              onPress={ () => this._submit() }
              customBackgroundColor={Color.headerColor}
              label={translations.saveAndGoNext}/>
          </View>
        }

        <TipModal tipModalRef={this.tipModalRef} snapPoints={snapPoints} screenName='IndicatorDevelopment' />
        <FormBottomSheetModal ref={this.formRef} formModalRef={this.indicatorListModalRef} snapPoints={indicatorDevelopmentModalSnapPoints} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    proposedIndicators: state.proposedIndicators,
    selectedIndicators: state.selectedIndicators,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedIndicators: (indicators) => dispatch(setSelectedIndicators(indicators)),
    setProposedIndicators: (indicators) => dispatch(setProposedIndicators(indicators)),
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
    setVotingIndicators: (indicators) => dispatch(setVotingIndicators(indicators)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndicatorDevelopment);