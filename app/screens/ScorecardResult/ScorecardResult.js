import React, {Component} from 'react';
import { View, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { connect } from 'react-redux';
import { getAll } from '../../actions/votingIndicatorAction';
import { set } from '../../actions/currentScorecardAction';
import { getAllScorecardReferences } from '../../actions/scorecardReferenceAction';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import BottomButton from '../../components/BottomButton';
import TipModal from '../../components/Tip/TipModal';
import Color from '../../themes/color';
import Tip from '../../components/Share/Tip';

import ScorecardResultTitle from '../../components/ScorecardResult/ScorecardResultTitle';
import ScorecardResultTable from '../../components/ScorecardResult/ScorecardResultTable';
import ScorecardResultAccordion from '../../components/ScorecardResult/ScorecardResultAccordion';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';

import scorecardResultService from '../../services/scorecard_result_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';

import ScorecardResultModalMain from '../../components/ScorecardResult/ScorecardResultModalMain';
import Scorecard from '../../models/Scorecard';
import { tipModalSnapPoints, SCORECARD_RESULT, swotModalSnapPoints } from '../../constants/modal_constant';
import { containerPadding } from '../../utils/responsive_util';

let _this = null;

class ScorecardResult extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
      currentIndicator: {},
      selectedIndicator: {},
    };
    _this = this;

    this.tipModalRef = React.createRef();
    this.swotModalRef = React.createRef();
    this.formRef = React.createRef();
  }

  componentDidMount() {
    if (this.state.scorecard.status < 5) {
      Scorecard.update(this.state.scorecard.uuid, {status: '5'})
      this.props.setCurrentScorecard(this.state.scorecard);
    }

    this.props.getAll(this.state.scorecard.uuid);
    this.props.getAllScorecardReferences(this.state.scorecard.uuid);
  }

  _renderHeader() {
    const { translations } = this.context;

    return (
      <HorizontalProgressHeader
        title={translations.scorecardResult}
        navigation={this.props.navigation}
        progressIndex={4}/>
    )
  }

  _renderTable() {
    return (
      <ScorecardResultTable
        scorecard={this.state.scorecard}
        indicators={this.props.indicators}
        handleShowModal={this._handleShowModal}
      />
    )
  }

  _renderAccordion() {
    return (
      <ScorecardResultAccordion
        indicators={this.props.indicators}
        onPress={(selectedIndicator, fieldName, indicator) => this._handleShowModal(selectedIndicator, fieldName, indicator)}
        isScorecardFinished={this.state.scorecard.finished}
      />
    )
  }

  _handleShowModal(indicator, fieldName, selectedIndicator) {
    _this.setState({
      currentIndicator: Object.assign({currentFieldName: fieldName}, indicator),
      selectedIndicator: selectedIndicator,
    }, () => {
      _this.formRef.current?.setBodyContent(_this.getSwotModalContent());

      setTimeout(() => {
        _this.swotModalRef.current?.present();
      }, 50);
    });
  }

  getSwotModalContent() {
    return <ScorecardResultModalMain
            indicator={this.state.currentIndicator}
            onDismiss={() => this.swotModalRef.current?.dismiss()}
            selectedIndicator={this.state.selectedIndicator}
            isScorecardFinished={this.state.scorecard.finished}
          />
  }

  save() {
    scorecardTracingStepsService.trace(this.props.route.params.scorecard_uuid, 8);
    this.props.navigation.reset({ index: 1, routes: [{ name: 'Home' }, {name: 'ScorecardList'}] });
  }

  render() {
    const { translations } = this.context;
    const snapPoints = tipModalSnapPoints[SCORECARD_RESULT];

    return (
      <View style={{height: '100%'}}>
        { this._renderHeader() }

        <ScrollView style={{flex: 1}}>
          <View style={{ padding: containerPadding, flex: 1 }}>
            <Tip screenName='ScorecardResult' showTipModal={() => this.tipModalRef.current?.present()} />

            <ScorecardResultTitle scorecardUuid={this.props.route.params.scorecard_uuid} navigation={this.props.navigation} />

            { !DeviceInfo.isTablet() ? this._renderAccordion() : this._renderTable() }
          </View>
        </ScrollView>

        <View style={{padding: containerPadding}}>
          <BottomButton
            disabled={!scorecardResultService.isSaveAble(this.state.scorecard)}
            onPress={() => this.save()}
            customBackgroundColor={Color.headerColor}
            iconName={'none'}
            label={translations.save}/>
        </View>

        <TipModal tipModalRef={this.tipModalRef} snapPoints={snapPoints} screenName='ScorecardResult' />
        <FormBottomSheetModal ref={this.formRef} formModalRef={this.swotModalRef} snapPoints={swotModalSnapPoints} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    indicators: state.votingIndicators.sort((a, b) => (a.order > b.order) ? 1 : -1),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: (scorecard_uuid) => dispatch(getAll(scorecard_uuid)),
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
    getAllScorecardReferences: (scorecard_uuid) => dispatch(getAllScorecardReferences(scorecard_uuid)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScorecardResult);