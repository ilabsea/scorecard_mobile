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
    this.participantModalRef = React.createRef();
    this.participantFormModalRef = React.createRef();
  }

  render() {
    const {translations} = this.context;
    const { scorecard_uuid } = this.props.route.params;

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
            participantModalRef={this.participantModalRef}
            participantFormModalRef={this.participantFormModalRef}
          />
        </View>

        <TipModal tipModalRef={this.tipModalRef} snapPoints={['49%', '76%']} screenName='RaisingProposed' />
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
