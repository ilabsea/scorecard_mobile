import React, {Component} from 'react';
import {Animated, View, StyleSheet, ScrollView} from 'react-native';

import Color from '../../themes/color';

import ProposedIndicatorNavHeader from './ProposedIndicatorNavHeader';

import Tip from '../Share/Tip';
import ListUser from './ListUser';
import BottomButton from '../BottomButton';
import {LocalizationContext} from '../../components/Translations';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import Participant from '../../models/Participant';
import Scorecard from '../../models/Scorecard';
import {connect} from 'react-redux' ;
import { removeFromSelected, setSelectedIndicators } from '../../actions/selectedIndicatorAction';
import { containerPadding } from '../../utils/responsive_util';
import { navigate } from '../../navigators/app_navigator';
import settingHelper from '../../helpers/setting_helper';

class ProposedIndicatorContent extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.scrollY = new Animated.Value(0)
  }

  componentDidMount() {
    this.props.setSelectedIndicators([])
  }

  onPress = async () => {
    Scorecard.update(this.props.scorecardUuid, { proposed_indicator_method: await settingHelper.getSelectedProposedIndicatorMethodId() });
    this.clearSelectedIndicators();
    this.props.setSelectedIndicators([])
    scorecardTracingStepsService.trace(this.props.scorecardUuid, 5);
    navigate('OfflineIndicatorDevelopment', {scorecard_uuid: this.props.scorecardUuid});
  }

  clearSelectedIndicators = () => {
    this.props.selectedIndicators.map(indicator => {
      this.props.removeFromSelected(indicator);
    });
  }

  renderFinishButton = () => {
    const {translations} = this.context;

    return (
      <View style={styles.buttonContainer}>
        <BottomButton
          disabled={!proposedIndicatorService.hasProposedIndicator(this.props.scorecardUuid)}
          label={translations['finishAndNext']}
          onPress={() => this.onPress()}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ProposedIndicatorNavHeader scrollY={this.scrollY} showTipModal={() => this.props.tipModalRef.current?.present()}/>
        <ScrollView contentContainerStyle={{padding: containerPadding, paddingBottom: 228, flexGrow: 1, marginTop: 156}}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.scrollY}}}], { useNativeDriver: false })}
        >
          <Tip screenName='ProposedIndicator' showTipModal={() => this.props.tipModalRef.current?.present()} />

          <ListUser
            scorecardUuid={this.props.scorecardUuid}
            numberOfParticipant={Participant.getAllByScorecard(this.props.scorecardUuid).length}
            numberOfProposedParticipant={Participant.getProposedParticipants(this.props.scorecardUuid).length}
            visibleModal={this.props.visibleModal}
            participantModalRef={this.props.participantModalRef}
            formModalRef={this.props.formModalRef}
            updateModalVisible={(status) => this.props.updateModalVisible(status)}
            scrollY={this.scrollY}
          />
        </ScrollView>

        { this.renderFinishButton() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: containerPadding
  },
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: Color.whiteColor,
  },
});

function mapStateToProps(state) {
  return {
    participants: state.participantReducer.participants,
    selectedIndicators: state.selectedIndicators,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeFromSelected: (indicator) => dispatch(removeFromSelected(indicator)),
    setSelectedIndicators: (selectedIndicators) => dispatch(setSelectedIndicators(selectedIndicators))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProposedIndicatorContent);
