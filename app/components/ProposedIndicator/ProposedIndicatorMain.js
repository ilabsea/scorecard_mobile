import React, {Component} from 'react';
import {Animated, View, ScrollView} from 'react-native';

import ProposedIndicatorNewProposeButton from './ProposedIndicatorNewProposeButton';
import Tip from '../Share/Tip';
import CollapsibleNavHeader from '../Share/CollapsibleNavHeader';
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
import {headerShrinkOffset} from '../../constants/component_style_constant';

class ProposedIndicatorContent extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.scrollY = new Animated.Value(0)
    this.isHeaderShrunk = false
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
    return (
      <View style={{padding: containerPadding}}>
        <BottomButton
          disabled={!proposedIndicatorService.hasProposedIndicator(this.props.scorecardUuid)}
          label={this.context.translations['finishAndNext']}
          onPress={() => this.onPress()}
        />
      </View>
    );
  }

  renderAddNewBtn = () => {
    return <ProposedIndicatorNewProposeButton
              scorecardUuid={this.props.scorecardUuid}
              visibleModal={this.props.visibleModal}
              participantModalRef={this.props.participantModalRef}
              formModalRef={this.props.formModalRef}
              updateModalVisible={(status) => this.props.updateModalVisible(status)}
           />
  }

  render() {
    const containerPaddingTop = this.scrollY.interpolate({
      inputRange: [0, 100, 140],
      outputRange: [186, 118, 96],
      // inputRange: [0, 100, 140],
      // outputRange: [156, 80, 70],
      extrapolate: 'clamp',
    })

    return (
      <React.Fragment>
        <CollapsibleNavHeader title={this.context.translations.proposeTheIndicator} scrollY={this.scrollY} progressIndex={3}
          showTipModal={() => !!this.isHeaderShrunk && this.props.tipModalRef.current?.present()} tipIconVisible={true}
        />
        <Animated.View style={{flex: 1, paddingTop: containerPaddingTop, zIndex: -1}}>
          <ScrollView contentContainerStyle={{paddingVertical: containerPadding, paddingBottom: 16, flexGrow: 1}}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.scrollY}}}],
                     { listener: (event) => {this.isHeaderShrunk = event.nativeEvent.contentOffset.y >= headerShrinkOffset}, useNativeDriver: false })}
            stickyHeaderIndices={[1]}
          >
            <Tip screenName='ProposedIndicator' showTipModal={() => this.props.tipModalRef.current?.present()} containerStyle={{marginHorizontal: containerPadding}} />
            {this.renderAddNewBtn()}
            <ListUser
              scorecardUuid={this.props.scorecardUuid}
              numberOfParticipant={Participant.getAllByScorecard(this.props.scorecardUuid).length}
              numberOfProposedParticipant={Participant.getRaisedParticipants(this.props.scorecardUuid).length}
              visibleModal={this.props.visibleModal}
              participantModalRef={this.props.participantModalRef}
              formModalRef={this.props.formModalRef}
              updateModalVisible={(status) => this.props.updateModalVisible(status)}
              isIndicatorBase={this.props.isIndicatorBase}
            />
          </ScrollView>

          { this.renderFinishButton() }
        </Animated.View>
      </React.Fragment>
    );
  }
}

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
