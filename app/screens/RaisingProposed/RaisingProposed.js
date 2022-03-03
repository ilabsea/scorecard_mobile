import React, {Component} from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import ProposeIndicatorContent from '../../components/RaisingProposed/ProposeIndicatorContent';
import ProgressHeader from '../../components/ProgressHeader';
import AddNewParticipantModal from '../../components/RaisingProposed/AddNewParticipantModal';
import TipModal from '../../components/Tip/TipModal';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';
import Scorecard from '../../models/Scorecard';
import { getDeviceStyle } from '../../utils/responsive_util';

class RaisingProposed extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.hasInternetConnection = false;
    let scorecard = Scorecard.find(props.route.params.scorecard_uuid);

    if (scorecard.status < 2) {
      Scorecard.update(scorecard.uuid, {status: '2'});
      props.setCurrentScorecard(scorecard);
    }

    this.tipModalRef = React.createRef();
  }

  render() {
    const {translations} = this.context;
    const { scorecard_uuid } = this.props.route.params;
    const tipSecondSnapPoint = getDeviceStyle('76%', '72%');

    return (
      <React.Fragment>
        <View style={{flex: 1}}>
          <ProgressHeader
            title={translations['getStarted']}
            progressIndex={3}
          />
          <ProposeIndicatorContent
            scorecardUuid={scorecard_uuid}
            navigation={this.props.navigation}
            tipModalRef={this.tipModalRef}
          />
        </View>

        <TipModal tipModalRef={this.tipModalRef} snapPoints={['49%', tipSecondSnapPoint]} screenName='RaisingProposed' />
        <AddNewParticipantModal />
      </React.Fragment>
    );
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
)(RaisingProposed);
