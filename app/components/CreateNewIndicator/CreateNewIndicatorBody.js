import React from 'react';
import { View } from 'react-native';

import AddNewIndicatorModalContent from '../RaisingProposed/AddNewIndicatorModalContent';
import CreateNewIndicatorContent from './CreateNewIndicatorContent';
import CreateNewIndicatorBottomButton from './CreateNewIndicatorBottomButton';

import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import ProposedIndicator from '../../models/ProposedIndicator';
import Color from '../../themes/color';

class CreateIndicatorBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      selectedCustomIndicator: null,
      participantUuid: props.participantUuid,
    }
  }

  componentDidMount() {
    const proposedIndicators = ProposedIndicator.find(this.props.scorecardUuid, this.state.participantUuid);
    this.setState({isValid: (proposedIndicators != undefined && proposedIndicators.length > 0) ? true : false});
  }

  closeModal = () => {
    this.setState({ selectedCustomIndicator: null });
    this.props.participantModalRef.current?.dismiss();
  }

  updateSelectedParticipant(participantUuid) {
    if (this.state.participantUuid != participantUuid) {
      this.props.removeUnconfirmedProposedIndicator();

      this.setState({
        isValid: false,
        participantUuid: participantUuid
      }, () => {
        !!this.props.updateSelectedParticipant && this.props.updateSelectedParticipant(participantUuid);
        this.props.participantModalRef.current?.dismiss();
      });
    }
  }

  finishSaveOrUpdateCustomIndicator(isEdit) {
    this.updateIndicatorList();

    if (isEdit)
      this.props.updateParticipantInfo();
  }

  updateIndicatorList() {
    this.setState({ isValid: ProposedIndicator.find(this.props.scorecardUuid, this.props.participantUuid).length > 0 });
    this.props.updateIndicatorList();
    this.closeModal();
  }

  showAddNewIndicatorModal(customIndicator) {
    this.setState({ selectedCustomIndicator: customIndicator }, () => {
      this.props.formModalRef.current?.setBodyContent(this.renderModalContent());
      setTimeout(() => {
        this.props.participantModalRef.current?.present();
      }, 50);
    });
  }

  renderModalContent() {
    return <AddNewIndicatorModalContent
              closeModal={() => this.closeModal()}
              participantUuid={this.state.participantUuid}
              scorecardUuid={this.props.scorecardUuid}
              selectedCustomIndicator={this.state.selectedCustomIndicator}
              indicators={this.props.indicators}
              isEdit={this.props.isEdit}
              finishSaveOrUpdateCustomIndicator={(isEdit) => this.finishSaveOrUpdateCustomIndicator(isEdit)}
              updateIndicatorList={() => this.updateIndicatorList()}
            />
  }

  renderContent() {
    return <CreateNewIndicatorContent
            scorecardUuid={this.props.scorecardUuid}
            participantUuid={this.state.participantUuid}
            indicators={this.props.indicators}
            isSearching={this.props.isSearching}
            isEdit={this.props.isEdit}
            updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
            showAddNewIndicatorModal={(indicator) => this.showAddNewIndicatorModal(indicator)}
            updateIndicatorList={() => this.updateIndicatorList()}
            closeModal={() => this.closeModal()}
            formModalRef={this.props.formModalRef}
            participantModalRef={this.props.participantModalRef}
          />
  }

  renderBottomButton = () => {
    return <CreateNewIndicatorBottomButton
            isSearching={this.props.isSearching}
            isEdit={this.props.isEdit}
            isValid={this.state.isValid}
            save={() => this.props.save()}
            stopEditing={() => this.props.updateEditStatus(false)}
            stopSearching={() => this.props.updateSearchStatus(false)}
            updateIndicatorList={() => this.props.updateIndicatorList()}
            scorecardUuid={this.props.scorecardUuid}
          />
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.whiteColor, padding: containerPadding, paddingBottom: 0, paddingTop: containerPaddingTop}}>
        { this.renderContent() }
        { this.renderBottomButton() }
      </View>
    )
  }
}

export default CreateIndicatorBody;