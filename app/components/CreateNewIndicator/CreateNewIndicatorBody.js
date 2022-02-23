import React from 'react';
import { View } from 'react-native';
import {Portal} from 'react-native-paper';

import AddNewIndicatorModal from '../RaisingProposed/AddNewIndicatorModal';
import CreateNewIndicatorContent from './CreateNewIndicatorContent';
import CreateNewIndicatorBottomButton from './CreateNewIndicatorBottomButton';

import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import ProposedIndicator from '../../models/ProposedIndicator';
import Color from '../../themes/color';

class CreateIndicatorBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
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
    this.setState({
      isModalVisible: false,
      selectedCustomIndicator: null,
    });
  }

  updateSelectedParticipant(participantUuid) {
    if (this.state.participantUuid != participantUuid) {
      this.props.removeUnconfirmedProposedIndicator();

      this.setState({
        isValid: false,
        participantUuid: participantUuid
      }, () => {
        !!this.props.updateSelectedParticipant && this.props.updateSelectedParticipant(participantUuid);
      });
    }
  }

  selectForEdit(customIndicator) {
    this.setState({
      isModalVisible: true,
      selectedCustomIndicator: customIndicator
    });
  }

  finishSaveOrUpdateCustomIndicator(isEdit) {
    this.updateIndicatorList();

    if (isEdit)
      this.props.updateParticipantInfo();
  }

  updateIndicatorList() {
    this.setState({ isValid: ProposedIndicator.find(this.props.scorecardUuid, this.props.participantUuid).length > 0 });
    this.props.updateIndicatorList();

    if (this.state.isModalVisible)
      this.closeModal();
  }

  renderContent() {
    return <CreateNewIndicatorContent
            scorecardUuid={this.props.scorecardUuid}
            participantUuid={this.state.participantUuid}
            indicators={this.props.indicators}
            isSearching={this.props.isSearching}
            isEdit={this.props.isEdit}
            selectForEdit={(indicator) => this.selectForEdit(indicator)}
            updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
            showAddNewIndicatorModal={() => this.setState({ isModalVisible: true })}
            updateIndicatorList={() => this.updateIndicatorList()}
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

  renderModal() {
    return <Portal>
            <AddNewIndicatorModal
              isVisible={this.state.isModalVisible}
              closeModal={() => this.closeModal()}
              participantUUID={this.state.participantUuid}
              scorecardUUID={this.props.scorecardUuid}
              selectedCustomIndicator={this.state.selectedCustomIndicator}
              indicators={this.props.indicators}
              isEdit={this.props.isEdit}
              finishSaveOrUpdateCustomIndicator={(isEdit) => this.finishSaveOrUpdateCustomIndicator(isEdit)}
              updateIndicatorList={() => this.updateIndicatorList()}
            />
          </Portal>
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.whiteColor, padding: containerPadding, paddingBottom: 0, paddingTop: containerPaddingTop}}>
        { this.renderContent() }
        { this.renderBottomButton() }
        { this.renderModal() }
      </View>
    )
  }
}

export default CreateIndicatorBody;
