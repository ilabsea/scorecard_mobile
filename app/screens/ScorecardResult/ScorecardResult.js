import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { getAll } from '../../actions/votingCriteriaAction';
import { set } from '../../actions/currentScorecardAction';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import BottomButton from '../../components/BottomButton';
import MessageModal from '../../components/MessageModal';
import Color from '../../themes/color';
import Tip from '../../components/Tip';

import { Table, TableWrapper, Row} from 'react-native-table-component';
import ScorecardResultTableRow from '../../components/ScorecardResult/ScorecardResultTableRow';
import ScorecardResultAccordion from '../../components/ScorecardResult/ScorecardResultAccordion';
import scorecardResultService from '../../services/scorecard_result_service';

import FormModal from '../../components/ScorecardResult/FormModal';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import Scorecard from '../../models/Scorecard';

import { getDeviceStyle, mobileHeadingTitleSize, containerPadding } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../assets/stylesheets/tablet/PopupModalStyle';
import PopupModalMobileStyles from '../../assets/stylesheets/mobile/PopupModalStyle';
const modalStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ScorecardResult extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
      currentCriteria: {},
      visible: false,
      visibleConfirmModal: false,
      selectedIndicator: {},
    };
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
    const { translations } = this.context;
    let tableHead = ['criteria', 'score', 'strength', 'weakness', 'suggested_action'];
    tableHead = tableHead.map(x => translations[x]);
    const tableRows = this.props.criterias;

    return (
      <Table borderStyle={{borderColor: '#c1c1c1', borderWidth: 1}}>
        <Row data={tableHead} style={styles.head} textStyle={[styles.text]} flexArr={[4, 2, 3, 3, 3]}/>
        {
          tableRows.map((criteria, index) => (
            <ScorecardResultTableRow key={index} criteria={criteria}
              onPress={(fieldName, indicator) => this._handleShowModal(criteria, fieldName, indicator)}
              isScorecardFinished={this.state.scorecard.finished}
            />
          ))
        }
      </Table>
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
    this.setState({
      currentCriteria: Object.assign({currentFieldName: fieldName}, criteria),
      visible: true,
      selectedIndicator: indicator,
    });
  }

  _confirmFinish() {
    this.setState({visibleConfirmModal: false});
    Scorecard.update(this.state.scorecard.uuid, {finished: true, finished_date: new Date()});
    this.props.navigation.reset({ index: 1, routes: [{ name: 'Home' }, {name: 'ScorecardList'}] });
  }

  _confirmFinishContent = () => {
    const {translations} = this.context;

    return (
      <View style={{marginTop: 10, marginBottom: 10}}>
        <Text style={modalStyles.label}>{translations.thisScorecardWillBeLocked}</Text>
        <Text style={[{ marginTop: 20 }, , modalStyles.label]}>
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

            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <Text style={styles.h1}>{ translations.scorecardResult }</Text>
            </View>

            { !DeviceInfo.isTablet() ? this._renderAccordion() : this._renderTable() }
          </View>
        </ScrollView>

        <View style={{padding: containerPadding}}>
          <BottomButton
            disabled={!scorecardResultService.isAllowToFinish(this.state.scorecard, this.props.criterias)}
            onPress={() => this.setState({visibleConfirmModal: true})}
            customBackgroundColor={Color.headerColor}
            iconName={'checkmark'}
            label={translations.finish}/>

          <FormModal
            visible={this.state.visible}
            criteria={this.state.currentCriteria}
            onDismiss={() => this.setState({visible: false})}
            selectedIndicator={this.state.selectedIndicator}
          />

          <MessageModal
            visible={this.state.visibleConfirmModal}
            onDismiss={() => this.setState({visibleConfirmModal: false})}
            title={translations.finish}
            hasConfirmButton={true}
            confirmButtonLabel={translations.ok}
            onPressConfirmButton={() => this._confirmFinish()}
            child={() => this._confirmFinishContent()}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    criterias: state.votingCriterias.sort((a, b) => (a.median > b.median) ? 1 : -1),
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
  h1: {
    fontSize: getDeviceStyle(24, mobileHeadingTitleSize()),
    fontFamily: FontFamily.title,
  },
  head: {
    minHeight: 64,
    backgroundColor: '#eee',
  },
  text: {
    margin: 6,
    textAlign: 'center',
    fontFamily: FontFamily.title,
    fontSize: 18
  },
})
