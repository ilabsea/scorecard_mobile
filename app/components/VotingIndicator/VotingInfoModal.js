import React, { Component } from 'react';

import { LocalizationContext } from '../Translations';
import BottomSheetModal from '../BottomSheetModal';
import ModalViewMoreButton from '../ModalViewMoreButton';

class VotingInfoModal extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      bodyContentFirstPart: null,
      bodyContentSecondPart: null,
      snapPoints: props.snapPoints
    }
  }

  setBodyContent(firstContent, secondContent) {
    this.setState({
      bodyContentFirstPart: firstContent,
      bodyContentSecondPart: secondContent,
    });
  }

  setSnapPoints(snapPoints) {
    this.setState({ snapPoints });
  }

  onChangeModal(index) {
    setTimeout(() => {
      this.setState({ isExpanded: index > 0 });
    }, 50);
  }

  renderContent() {
    return (
      <React.Fragment>
        { this.state.bodyContentFirstPart }

        { (!!this.state.bodyContentSecondPart && !this.state.isExpanded) &&
          <ModalViewMoreButton modalRef={this.props.votingInfoModalRef}
            updateIsExpanded={() => this.setState({ isExpanded: true })}
          />
        }

        { !!this.state.bodyContentSecondPart && this.state.bodyContentSecondPart }
      </React.Fragment>
    )
  }

  render() {
    return (
      <BottomSheetModal
        ref={this.props.votingInfoModalRef}
        content={this.renderContent()}
        snapPoints={this.state.snapPoints}
        onDismiss={() => this.setState({ isExpanded: false })}
        onChange={(index) => this.onChangeModal(index)}
      />
    )
  }
}

export default VotingInfoModal;