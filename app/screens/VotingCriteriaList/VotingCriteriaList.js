import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import TipModal from '../../components/Tip/TipModal';
import VotingInfoModal from '../../components/VotingCriteria/VotingInfoModal';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';
import VotingIndicatorListContent from '../../components/VotingCriteria/VotingIndicatorListContent';
import { getAll, setVotingCriterias } from '../../actions/votingCriteriaAction';
import { set } from '../../actions/currentScorecardAction';

import Scorecard from '../../models/Scorecard';
import VotingCriteria from '../../models/VotingCriteria';
import { tipModalSnapPoints, VOTING_INDICATOR, participantModalSnapPoints } from '../../constants/modal_constant';

class VotingCriteriaList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      scorecard: Scorecard.find(props.route.params.scorecard_uuid),
      votingCriterias: VotingCriteria.getAll(props.route.params.scorecard_uuid),
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

  _renderHeader() {
    return (
      <HorizontalProgressHeader
        title={this.context.translations.voting}
        navigation={this.props.navigation}
        progressIndex={3}/>
    )
  }

  _renderBody() {
    return <VotingIndicatorListContent
            scorecard={this.state.scorecard}
            votingCriterias={this.state.votingCriterias}
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
      <View style={{height: '100%'}}>
        { this._renderHeader() }

        { this._renderBody() }

        <TipModal tipModalRef={this.tipModalRef} snapPoints={snapPoints} screenName='VotingCriteriaList' />
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
    votingCriterias: state.votingCriterias,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    refreshVotingCriteriaState: (scorecard_uuid) => dispatch(getAll(scorecard_uuid)),
    setVotingCriterias: (criterias) => dispatch(setVotingCriterias(criterias)),
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VotingCriteriaList);