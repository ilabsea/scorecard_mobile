import React, {Component} from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import ProposedIndicatorContent from '../../components/RaisingProposed/ProposedIndicatorContent';
import ProgressHeader from '../../components/ProgressHeader';
import TipModal from '../../components/Tip/TipModal';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';
import Scorecard from '../../models/Scorecard';
import { tipModalSnapPoints, PROPOSED_INDICATOR, participantModalSnapPoints } from '../../constants/modal_constant';

class RaisingProposed extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
    }

    this.hasInternetConnection = false;
    let scorecard = Scorecard.find(props.route.params.scorecard_uuid);

    if (scorecard.status < 2) {
      Scorecard.update(scorecard.uuid, {status: '2'});
      props.setCurrentScorecard(scorecard);
    }

    this.tipModalRef = React.createRef();
    this.participantModalRef = React.createRef();
    this.formModalRef = React.createRef();
  }

  render() {
    const {translations} = this.context;
    const { scorecard_uuid } = this.props.route.params;
    const tipSecondSnapPoint = tipModalSnapPoints[PROPOSED_INDICATOR];

    return (
      <React.Fragment>
        <View style={{flex: 1}}>
          <ProgressHeader title={translations['getStarted']} progressIndex={3} />

          <ProposedIndicatorContent
            scorecardUuid={scorecard_uuid}
            visibleModal={this.state.visibleModal}
            tipModalRef={this.tipModalRef}
            participantModalRef={this.participantModalRef}
            formModalRef={this.formModalRef}
            updateModalVisible={(status) => this.setState({ visibleModal: status })}
          />
        </View>

        <TipModal tipModalRef={this.tipModalRef} snapPoints={['54%', tipSecondSnapPoint]} screenName='RaisingProposed' />
        <FormBottomSheetModal ref={this.formModalRef} formModalRef={this.participantModalRef} snapPoints={participantModalSnapPoints}
          onDismissModal={() => this.setState({ visibleModal: false })}
        />
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