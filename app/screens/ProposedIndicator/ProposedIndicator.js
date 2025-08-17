import React, {Component} from 'react';
import { View, BackHandler } from 'react-native';

import ProposedIndicatorMain from '../../components/ProposedIndicator/ProposedIndicatorMain';
import TipModal from '../../components/Tip/TipModal';
import FormBottomSheetModal from '../../components/FormBottomSheetModal/FormBottomSheetModal';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';
import Scorecard from '../../models/Scorecard';
import { tipModalSnapPoints, PROPOSED_INDICATOR, participantModalSnapPoints } from '../../constants/modal_constant';
import { screenPaddingBottom } from '../../constants/component_style_constant';

class ProposedIndicator extends Component {
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
    this.backHandler = null;
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!!this.formModalRef.current?.isOpen()) {
        this.participantModalRef.current?.dismiss();
        return true;
      }
      return false;
    })
  }

  componentWillUnmount() {
    !!this.backHandler && this.backHandler.remove()
  }

  onDismissBottomSheet() {
    this.setState({ visibleModal: false });
    this.formModalRef.current?.setBodyContent(null)
  }

  render() {
    const { scorecard_uuid } = this.props.route.params;
    const tipSecondSnapPoint = tipModalSnapPoints[PROPOSED_INDICATOR];

    return (
      <View style={{flexGrow: 1, paddingBottom: screenPaddingBottom}}>
        <ProposedIndicatorMain
          scorecardUuid={scorecard_uuid}
          visibleModal={this.state.visibleModal}
          tipModalRef={this.tipModalRef}
          participantModalRef={this.participantModalRef}
          formModalRef={this.formModalRef}
          updateModalVisible={(status) => this.setState({ visibleModal: status })}
          isIndicatorBase={this.props.route.params.isIndicatorBase}
        />
        <TipModal tipModalRef={this.tipModalRef} snapPoints={tipSecondSnapPoint} screenName='ProposedIndicator' />
        <FormBottomSheetModal ref={this.formModalRef} formModalRef={this.participantModalRef} snapPoints={participantModalSnapPoints}
          onDismissModal={() => this.onDismissBottomSheet()}
        />
      </View>
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
)(ProposedIndicator);