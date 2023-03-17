import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import AddNewIndicatorModalMain from '../ProposedIndicator/AddNewIndicatorModalMain';
import CreateNewIndicatorMain from './CreateNewIndicatorMain';
import CreateNewIndicatorBottomButton from './CreateNewIndicatorBottomButton';

import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import { containerPaddingTop, containerPadding } from '../../utils/responsive_util';
import ProposedIndicator from '../../models/ProposedIndicator';
import Color from '../../themes/color';

import FormBottomSheetModal from '../FormBottomSheetModal/FormBottomSheetModal';
import { participantModalSnapPoints } from '../../constants/modal_constant';

class CreateIndicatorBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      selectedCustomIndicator: null,
      participantUuid: props.participantUuid,
      isIndicatorBase: false
    }

    this.participantModalRef = React.createRef();
    this.formModalRef = React.createRef();
  }

  async componentDidMount() {
    const proposedIndicators = proposedIndicatorHelper.getProposedIndicators(this.props.scorecardUuid, this.state.participantUuid);

    this.setState({
      isValid: (proposedIndicators != undefined && proposedIndicators.length > 0),
      isIndicatorBase: await isProposeByIndicatorBase(),
    });
  }

  closeModal = () => {
    this.setState({ selectedCustomIndicator: null });
    this.participantModalRef.current?.dismiss();
  }

  updateSelectedParticipant(participantUuid) {
    if (this.state.participantUuid != participantUuid) {
      !!this.props.handleUnconfirmedIndicator && this.props.handleUnconfirmedIndicator();

      this.setState({
        isValid: false,
        participantUuid: participantUuid
      }, () => {
        !!this.props.updateSelectedParticipant && this.props.updateSelectedParticipant(participantUuid);
        this.participantModalRef.current?.dismiss();
      });
    }
  }

  finishSaveOrUpdateCustomIndicator(isEdit) {
    this.updateIndicatorList();

    if (isEdit)
      this.props.updateParticipantInfo();
  }

  updateIndicatorList() {
    const proposedIndicators = !this.state.isIndicatorBase ? ProposedIndicator.find(this.props.scorecardUuid, this.props.participantUuid)
                                : ProposedIndicator.getAllByScorecard(this.props.scorecardUuid);

    this.setState({ isValid: proposedIndicators.length > 0 });
    this.props.updateIndicatorList();
    !!this.props.isEdit && this.closeModal();
  }

  showAddNewIndicatorModal(customIndicator) {
    this.setState({ selectedCustomIndicator: customIndicator }, () => {
      this.formModalRef.current?.setBodyContent(this.renderModalContent());
      setTimeout(() => {
        this.participantModalRef.current?.present();
      }, 50);
    });
  }

  renderContent() {
    return <CreateNewIndicatorMain
            scorecardUuid={this.props.scorecardUuid}
            participantUuid={this.state.participantUuid}
            indicators={this.props.indicators}
            isSearching={this.props.isSearching}
            isEdit={this.props.isEdit}
            isIndicatorBase={this.state.isIndicatorBase}
            updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
            showAddNewIndicatorModal={(indicator) => this.showAddNewIndicatorModal(indicator)}
            updateIndicatorList={() => this.updateIndicatorList()}
            closeModal={() => this.closeModal()}
            formModalRef={this.formModalRef}
            participantModalRef={this.participantModalRef}
            isLoading={this.props.isLoading}
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

  renderModalContent() {
    return <AddNewIndicatorModalMain
            closeModal={() => this.closeModal()}
            participantUuid={this.state.participantUuid}
            scorecardUuid={this.props.scorecardUuid}
            selectedCustomIndicator={this.state.selectedCustomIndicator}
            indicators={this.props.indicators}
            isEdit={this.props.isEdit}
            isIndicatorBase={this.state.isIndicatorBase}
            finishSaveOrUpdateCustomIndicator={(isEdit) => this.finishSaveOrUpdateCustomIndicator(isEdit)}
            updateIndicatorList={() => this.updateIndicatorList()}
            formModalRef={this.formModalRef}
            participantModalRef={this.participantModalRef}
          />
  }

  onDismissBottomSheet() {
    this.updateIndicatorList();
    this.formModalRef.current?.setBodyContent(null);
  }

  render() {
    return (
      <React.Fragment>
        <View style={{flex: 1, backgroundColor: Color.whiteColor, padding: containerPadding, paddingBottom: 0, paddingTop: containerPaddingTop}}>
          <Spinner
            visible={this.props.isLoading}
            color={Color.primaryColor}
            overlayColor={Color.loadingBackgroundColor}
          />
          { this.renderContent() }
          { this.renderBottomButton() }
        </View>
        <FormBottomSheetModal ref={this.formModalRef} formModalRef={this.participantModalRef} snapPoints={participantModalSnapPoints} onDismissModal={() => this.onDismissBottomSheet()} />
      </React.Fragment>
    )
  }
}

export default CreateIndicatorBody;