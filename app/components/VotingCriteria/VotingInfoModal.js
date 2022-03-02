import React, { Component } from 'react';

import BottomSheetModal from '../BottomSheetModal';

class VotingInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      bodyContent: null,
      snapPoints: props.snapPoints
    }
  }

  setBodyContent(bodyContent) {
    this.setState({ bodyContent });
  }

  setSnapPoints(snapPoints) {
    this.setState({ snapPoints });
  }

  render() {
    return (
      <BottomSheetModal
        ref={this.props.votingInfoModalRef}
        content={this.state.bodyContent}
        snapPoints={this.state.snapPoints}
        onDismiss={() => this.setState({ isExpanded: false })}
        // onChange={(index) => this.onChangeModal(index)}
      />
    )
  }
}

export default VotingInfoModal;