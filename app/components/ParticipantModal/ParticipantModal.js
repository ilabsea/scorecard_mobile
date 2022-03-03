import React from 'react';

import { LocalizationContext } from '../Translations';
import BottomSheetModal from '../BottomSheetModal';

class ParticipantModal extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      bodyContent: null,
      snapPoints: props.snapPoints
    }
  }

  setBodyContent(bodyContent) {
    this.setState({ bodyContent });
  }

  render() {
    return (
      <BottomSheetModal
        ref={this.props.participantModalRef}
        content={this.state.bodyContent}
        snapPoints={this.state.snapPoints}
        onDismiss={() => this.props.onDismissModal()}
      />
    )
  }
}

export default ParticipantModal;