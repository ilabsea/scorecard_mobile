import React, {Component} from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import { LocalizationContext } from '../../components/Translations';
import EmptyListAction from '../../components/Share/EmptyListAction';
import ScorecardListModals from '../../components/ScorecardList/ScorecardListModals';
import ScorecardListScrollView from '../../components/ScorecardList/ScorecardListScrollView';

import Scorecard from '../../models/Scorecard';
import scorecardDeletionService from '../../services/scorecard_deletion_service';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';

import { SELECTED_FILTERS } from '../../constants/main_constant';
import scorecardFilterService from '../../services/scorecard_filter_service';
import scorecardHelper from '../../helpers/scorecard_helper';
import Color from '../../themes/color';

class ScorecardList extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      isConfirmModal: true,
      selectedScorecard: null,
      scorecards: Scorecard.getAll(),
      isLoading: true,
      visibleErrorModal: false,
      headerHeight: 0,
      isDeleting: false
    }
  }

  async componentDidMount() {
    this.updateMilestone();

    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.setState({ isLoading: true });

      setTimeout(async () => {
        this.setState({
          scorecards: await scorecardFilterService.getFilteredScorecards(),
          isLoading: false,
        });
      }, 100);
    });
  }

  updateMilestone() {
    this.state.scorecards.map(scorecard => {
      scorecardHelper.updateFinishedMilestone(scorecard);
    });
  }

  componentWillUnmount() {
    this.focusListener && this.focusListener();
    AsyncStorage.removeItem(SELECTED_FILTERS);

    this.setState = (state, callback) => {
      return;
    };
  }

  onPress(scorecard) {
    // console.log('scorecard milestone = ', scorecard.milestone)
    console.log('scorecard running status uploaded = ', scorecard.running_status_uploaded)

    // Prevent the user from viewing the scorecard detail if the scorecard is deleting
    if (this.state.isDeleting)
      return;

    this.props.setCurrentScorecard(scorecard);
    this.props.navigation.navigate('ScorecardProgress', {uuid: scorecard.uuid});
  }

  _renderNoData() {
    const { translations } = this.context

    return (
      <EmptyListAction
        title={translations.pleaseAddScorecard}
        buttonLabel={translations.startScorecard}
        onPress={() => this.props.navigation.reset({ index: 1, routes: [{ name: 'Home' }, {name: 'NewScorecard'}] })}
      />
    );
  }

  _confirmDelete() {
    if (!this.state.selectedScorecard)
      return;

    this.setState({ isDeleting: true })

    scorecardDeletionService.deleteScorecard(this.state.selectedScorecard.uuid, async () => {
      this.setState({
        visibleModal: false,
        scorecards: await scorecardFilterService.getFilteredScorecards(),
        selectedScorecard: null,
        isDeleting: false,
      });
    }, (error) => {
      const isErrorUnauthorize =  error.status == '401' ? true : false;

      this.setState({
        isConfirmModal: isErrorUnauthorize,
        visibleModal: !isErrorUnauthorize,
        visibleErrorModal: isErrorUnauthorize,
        isDeleting: false
      });
    });
  }

  onMessageModalDismiss() {
    this.setState({
      visibleModal: false,
      selectedScorecard: null,
    });
    setTimeout(() => {
      this.setState({isConfirmModal: true});
    }, 500);
  }

  render() {
    const scorecardUuid = this.state.selectedScorecard ? this.state.selectedScorecard.uuid : '';

    if (!this.state.scorecards.length)
      return this._renderNoData();

    return (
      <View style={{flex: 1}}
        onLayout={(event) => this.setState({ headerHeight: event.nativeEvent.layout.y })}
      >
        { !this.state.isLoading &&
          <ScorecardListScrollView
            scorecards={this.state.scorecards}
            selectScorecard={(scorecard) => this.onPress(scorecard)}
            showDeleteModal={(scorecard) => this.setState({ visibleModal: true, selectedScorecard: scorecard })}
          />
        }

        <Spinner visible={this.state.isLoading} color={Color.primaryColor} overlayColor={Color.loadingBackgroundColor} />

        <ScorecardListModals
          visibleConfirmModal={this.state.visibleModal}
          onConfirmModalDismiss={() => this.onMessageModalDismiss()}
          visibleErrorModal={this.state.visibleErrorModal}
          onErrorModalDismiss={() => this.setState({ visibleErrorModal: false })}
          scorecardUuid={scorecardUuid}
          isConfirmModal={this.state.isConfirmModal}
          confirmDelete={() => this._confirmDelete()}
          headerHeight={this.state.headerHeight}
          scorecards={this.state.scorecards}
          isDeleting={this.state.isDeleting}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScorecardList);