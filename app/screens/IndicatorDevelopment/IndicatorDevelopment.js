import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import BottomButton from '../../components/BottomButton';
import ProposedIndicatorListModalContent from '../../components/IndicatorDevelopment/ProposedIndicatorListModalContent';
import IndicatorDevelopmentContent from '../../components/IndicatorDevelopment/IndicatorDevelopmentContent';
import TipModal from '../../components/Tip/TipModal';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';
import ErrorAlertMessage from '../../components/Share/ErrorAlertMessage';

import Color from '../../themes/color';
import { setProposedIndicators } from '../../actions/proposedIndicatorAction';
import { setSelectedIndicators } from '../../actions/selectedIndicatorAction';
import { set } from '../../actions/currentScorecardAction';
import { setVotingIndicators } from '../../actions/votingIndicatorAction';

import Scorecard from '../../models/Scorecard';
import votingIndicatorService from '../../services/voting_indicator_service';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import onlineScorecardSubmissionService from '../../services/online_scorecard_submission_service';
import { bottomButtonContainerPadding } from '../../utils/responsive_util';
import { screenPaddingBottom } from '../../utils/component_util';
import { tipModalSnapPoints, INDICATOR_DEVELOPMENT, indicatorDevelopmentModalSnapPoints } from '../../constants/modal_constant';
import { ERROR_DRAFT_SUBMIT, ERROR_NOT_FOUND } from '../../constants/error_constant';

class IndicatorDevelopment extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
      playingUuid: null,
      visibleModal: false,
      errorType: null
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

    const scorecard = Scorecard.find(this.props.route.params.scorecard_uuid);
    if (scorecard.is_offline) {
      this.props.navigation.navigate('VotingIndicatorList', { scorecard_uuid: this.state.scorecard.uuid });
    }
    else {
      onlineScorecardSubmissionService.draftSubmit({
        scorecardUuid: this.props.route.params.scorecard_uuid,
        successCallback: () => {
          this.props.navigation.navigate('VotingQr', { scorecard_uuid: this.state.scorecard.uuid });
        },
        errorCallback: (errorType) => {

          console.log('=== save draft error = ', errorType);

          this.setState({
            errorType: errorType != ERROR_NOT_FOUND ? errorType : ERROR_DRAFT_SUBMIT,
            visibleModal: true
          });
        }
      });
    }
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
      <View style={{flex: 1, paddingBottom: screenPaddingBottom(this.props.sdkVersion)}}>
        { this._renderContent() }
        { !!this.props.selectedIndicators.length &&
          <View style={bottomButtonContainerPadding()}>
            <BottomButton
              onPress={ () => this._submit() }
              customBackgroundColor={Color.headerColor}
              label={translations.saveAndGoNext}/>
          </View>
        }

        <TipModal tipModalRef={this.tipModalRef} snapPoints={snapPoints} screenName='IndicatorDevelopment' />
        <FormBottomSheetModal ref={this.formRef} formModalRef={this.indicatorListModalRef} snapPoints={indicatorDevelopmentModalSnapPoints} />
        <ErrorAlertMessage
          visible={this.state.visibleModal}
          errorType={this.state.errorType}
          scorecardUuid={this.state.scorecard.uuid}
          onDismiss={() => this.setState({ visibleModal: false })}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    proposedIndicators: state.proposedIndicators,
    selectedIndicators: state.selectedIndicators,
    sdkVersion: state.sdkVersion
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