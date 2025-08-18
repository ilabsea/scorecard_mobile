import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import TipModal from '../../components/Tip/TipModal';
import VotingInfoModal from '../../components/VotingIndicator/VotingInfoModal';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';
import VotingIndicatorListContent from '../../components/VotingIndicator/VotingIndicatorListContent';
import { getAll } from '../../actions/votingIndicatorAction';
import { set } from '../../actions/currentScorecardAction';

import Scorecard from '../../models/Scorecard';
import { tipModalSnapPoints, VOTING_INDICATOR, participantModalSnapPoints } from '../../constants/modal_constant';
import { screenPaddingBottom } from '../../constants/component_style_constant';
import VotingIndicator from '../../models/VotingIndicator';

class VotingIndicatorList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
      votingIndicators: VotingIndicator.getAll(props.route.params.scorecard_uuid),
    };

    this.tipModalRef = React.createRef();
    // modal reference of voting info
    this.votingInfoModalRef = React.createRef();
    this.infoModalRef = React.createRef();
    // modal reference of participant list
    this.formRef = React.createRef();
    this.participantModalRef = React.createRef();
  }

  componentDidMount() {
    if (this.state.scorecard.status < 4) {
      Scorecard.update(this.state.scorecard.uuid, {status: '4'})
      this.props.setCurrentScorecard(this.state.scorecard);
    }
  }

  _renderBody() {
    return <VotingIndicatorListContent
            scorecard={this.state.scorecard}
            votingIndicators={this.state.votingIndicators}
            tipModalRef={this.tipModalRef}
            votingInfoModalRef={this.votingInfoModalRef}
            infoModalRef={this.infoModalRef}
            participantModalRef={this.participantModalRef}
            formModalRef={this.formRef}
            updateModalVisible={(status) => this.setState({ visibleModal: status })}
          />
  }

  render() {
    const snapPoints = tipModalSnapPoints[VOTING_INDICATOR];

    return (
      <View style={{height: '100%', paddingBottom: screenPaddingBottom}}>
        { this._renderBody() }

        <TipModal tipModalRef={this.tipModalRef} snapPoints={snapPoints} screenName='VotingIndicatorList' />
        <VotingInfoModal ref={this.infoModalRef} votingInfoModalRef={this.votingInfoModalRef} snapPoints={[]} />
        <FormBottomSheetModal ref={this.formRef} formModalRef={this.participantModalRef} snapPoints={participantModalSnapPoints}
          onDismissModal={() => this.setState({ visibleModal: false })}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    votingIndicators: state.votingIndicators,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    refreshVotingIndicatorState: (scorecard_uuid) => dispatch(getAll(scorecard_uuid)),
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VotingIndicatorList);
