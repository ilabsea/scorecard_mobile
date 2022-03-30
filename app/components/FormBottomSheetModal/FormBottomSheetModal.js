import React from 'react';
import BottomSheetModal from '../BottomSheetModal';

class FormBottomSheetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyContent: null,
    }
  }

  setBodyContent(bodyContent) {
    this.setState({ bodyContent });
  }

  onDismissModal() {
    !!this.props.onDismissModal && this.props.onDismissModal()
  }

  render() {
    return (
      <BottomSheetModal
        ref={this.props.formModalRef}
        content={this.state.bodyContent}
        snapPoints={this.props.snapPoints}
        onDismiss={() => this.onDismissModal()}
      />
    )
  }
}

export default FormBottomSheetModal;