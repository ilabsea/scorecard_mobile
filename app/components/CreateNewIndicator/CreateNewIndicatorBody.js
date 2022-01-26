import React from 'react';

import CreateNewIndicatorContent from './CreateNewIndicatorContent';
import CreateNewIndicatorBottomButton from './CreateNewIndicatorBottomButton';
import AddNewIndicatorModal from '../RaisingProposed/AddNewIndicatorModal';

class CreateNewIndicatorBody extends React.Component {
  renderContent() {
    return (
      <CreateNewIndicatorContent
        scorecardUuid={this.props.scorecardUuid}
        participantUuid={this.props.participantUuid}
        indicators={this.props.indicators}
        selectedIndicators={this.props.selectedIndicators}
        unselectedIndicators={this.props.unselectedIndicators}
        groupedIndicators={this.props.groupedIndicators}
        customIndicator={this.props.customIndicator}
        selectedCustomIndicator={this.props.selectedCustomIndicator}
        isSearching={this.props.isSearching}
        isEdit={this.props.isEdit}
        selectIndicator={this.props.selectIndicator}
        editCustomIndicator={(customIndicator) => this.props.editCustomIndicator(customIndicator)}
        updateSelectedParticipant={(participantUuid) => this.props.updateSelectedParticipant(participantUuid)}
      />
    )
  }

  renderBottomButton = () => {
    return <CreateNewIndicatorBottomButton
              isSearching={this.props.isSearching}
              isEdit={this.props.isEdit}
              isValid={this.props.isValid}
              selectedIndicators={this.props.selectedIndicators}
              save={() => this.props.save()}
              stopEditing={() => this.props.stopEditing()}
              stopSearching={() => this.props.stopSearching()}
              updateSearchedIndicator={this.props.updateSearchedIndicator}
              scorecardUuid={this.props.scorecardUuid}
           />
  };

  renderModal() {
    return <AddNewIndicatorModal
              isVisible={this.props.isModalVisible}
              participantUUID={this.props.participantUuid}
              scorecardUUID={this.props.scorecardUuid}
              selectedCustomIndicator={this.props.selectedCustomIndicator}
              isEdit={this.props.isEdit}
              selectedIndicators={this.props.selectedIndicators}
              updateCustomIndicator={(customIndicator) => this.props.updateCustomIndicator(customIndicator)}
              saveCustomIndicator={(customIndicator) => this.props.saveCustomIndicator(customIndicator)}
              closeModal={() => this.props.closeModal()}
            />
  }

  render() {
    return (
      <React.Fragment>
        { this.renderContent() }
        { this.renderBottomButton() }
        { this.renderModal() }
      </React.Fragment>
    )
  }
}

export default CreateNewIndicatorBody;