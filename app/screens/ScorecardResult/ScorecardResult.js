import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { Text } from 'native-base';
import { connect } from 'react-redux';
import { getAll } from '../../actions/votingCriteriaAction';
import { set } from '../../actions/currentScorecardAction';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import BottomButton from '../../components/BottomButton';
import Color from '../../themes/color';
import Tip from '../../components/Tip';

import ScorecardResultTitle from '../../components/ScorecardResult/ScorecardResultTitle';
import ScorecardResultTable from '../../components/ScorecardResult/ScorecardResultTable';
import ScorecardResultAccordion from '../../components/ScorecardResult/ScorecardResultAccordion';
import scorecardResultService from '../../services/scorecard_result_service';
import scorecardStepService from '../../services/scorecard_step_service';

import FormModal from '../../components/ScorecardResult/FormModal';
import Scorecard from '../../models/Scorecard';

import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';
const modalStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

let _this = null;

class ScorecardResult extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
      currentCriteria: {},
      visible: false,
      selectedIndicator: {},
    };
    _this = this;
  }

  componentDidMount() {
    if (this.state.scorecard.status < 5) {
      Scorecard.update(this.state.scorecard.uuid, {status: '5'})
      this.props.setCurrentScorecard(this.state.scorecard);
    }

    this.props.getAll(this.state.scorecard.uuid);
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
        criterias={this.props.criterias}
        handleShowModal={this._handleShowModal}
      />
    )
  }

  _renderAccordion() {
    return (
      <ScorecardResultAccordion
        criterias={this.props.criterias}
        onPress={(criteria, fieldName, indicator) => this._handleShowModal(criteria, fieldName, indicator)}
        isScorecardFinished={this.state.scorecard.finished}
      />
    )
  }

  _handleShowModal(criteria, fieldName, indicator) {
    _this.setState({
      currentCriteria: Object.assign({currentFieldName: fieldName}, criteria),
      visible: true,
      selectedIndicator: indicator,
    });
  }

  save() {
    scorecardStepService.recordStep(this.props.route.params.scorecard_uuid, 8);
    this.props.navigation.reset({ index: 1, routes: [{ name: 'Home' }, {name: 'ScorecardList'}] });
  }

  _confirmFinishContent = () => {
    const {translations} = this.context;

    return (
      <View>
        <Text style={modalStyles.label}>
          {translations.formatString(translations.thisScorecardWillBeLocked, this.props.route.params.scorecard_uuid)}
        </Text>
        <Text style={[{ marginTop: 12 }, , modalStyles.label]}>
          {translations.formatString(translations.areYouSureYouWantToFinish, this.props.route.params.scorecard_uuid)}
        </Text>
      </View>
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{height: '100%'}}>
        { this._renderHeader() }

        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <Tip screenName={'ScorecardResult'}/>

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

          <FormModal
            visible={this.state.visible}
            criteria={this.state.currentCriteria}
            onDismiss={() => this.setState({visible: false})}
            selectedIndicator={this.state.selectedIndicator}
            isScorecardFinished={this.state.scorecard.finished}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    criterias: state.votingCriterias.sort((a, b) => (a.order > b.order) ? 1 : -1),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: (scorecard_uuid) => dispatch(getAll(scorecard_uuid)),
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScorecardResult);

const styles = StyleSheet.create({
  container: {
    padding: containerPadding,
    flex: 1
  },
})
