import React, {Component} from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import ProposeIndicatorContent from '../../components/RaisingProposed/ProposeIndicatorContent';
import ProgressHeader from '../../components/ProgressHeader';
import AddNewParticipantModal from '../../components/RaisingProposed/AddNewParticipantModal';
import TipModal from '../../components/Tip/TipModal';
import tips from '../../db/jsons/tips';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';
import Scorecard from '../../models/Scorecard';

class RaisingProposed extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      tip: tips.filter(t => t.screenName == props.screenName)[0] || tips[0],
    }
    this.hasInternetConnection = false;
    let scorecard = Scorecard.find(props.route.params.scorecard_uuid);

    if (scorecard.status < 2) {
      Scorecard.update(scorecard.uuid, {status: '2'});
      props.setCurrentScorecard(scorecard);
    }

    this.tipModalRef = React.createRef();
    this.participantFormModalRef = React.createRef();
  }

  render() {
    const {translations} = this.context;
    return (
      <React.Fragment>
        <View style={{flex: 1}}>
          <ProgressHeader
            title={translations['getStarted']}
            progressIndex={3}
          />
          <ProposeIndicatorContent
            scorecardUuid={this.props.route.params.scorecard_uuid}
            navigation={this.props.navigation}
            tipModalRef={this.tipModalRef}
            participantFormModalRef={this.participantFormModalRef}
          />
        </View>

        <TipModal tipModalRef={this.tipModalRef} tip={this.state.tip} />
        <AddNewParticipantModal participantFormModalRef={this.participantFormModalRef} />
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
