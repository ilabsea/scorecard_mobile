import React from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import ProposeNewIndicatorCardItem from './ProposeNewIndicatorCardItem';
import EmptyListAction from '../Share/EmptyListAction';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import CustomIndicatorBottomSheet from '../CustomIndicatorBottomSheet/CustomIndicatorBottomSheet';
import Indicator from '../../models/Indicator';
import ProposedIndicator from '../../models/ProposedIndicator';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import {customIndicatorModalSnapPoints, participantModalSnapPoints} from '../../constants/modal_constant';
import {getDeviceStyle} from '../../utils/responsive_util';

class ProposeNewIndicatorProposedList extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.state = { visibleModal: false }
    this.selectedIndicatorableId = null;
    this.listRef = []
    this.prevOpenedRow = null;
  }

  editProposedIndicator = (indicator, indicatorableId, index) => {
    let indicatorParams = indicator
    indicatorParams['indicatorable_id'] = indicatorableId
    this.props.bottomSheetRef.current?.setSnapPoints(participantModalSnapPoints)
    const proposedIndicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: indicatorParams };
    proposedIndicatorHelper.showFormModal(this.props.bottomSheetRef, this.props.formModalRef, proposedIndicatorParams);
    this.listRef[index].close()
  }

  handleCloseRow = (index) => {
    if (this.prevOpenedRow && this.prevOpenedRow !== this.listRef[index])
      this.prevOpenedRow.close();

    this.prevOpenedRow = this.listRef[index];
  }

  renderModalContent(customIndicator) {
    return <CustomIndicatorBottomSheet
              closeModal={() => this.closeModal()}
              participantUuid={this.props.participantUuid}
              scorecardUuid={this.props.scorecardUuid}
              selectedCustomIndicator={customIndicator}
              isEdit={true}
              isIndicatorBase={this.props.isIndicatorBase}
              bottomSheetRef={this.props.bottomSheetRef}
              formModalRef={this.props.formModalRef}
           />
  }

  showCustomIndicatorModal(customIndicator, index) {
    this.listRef[index].close()
    this.props.bottomSheetRef.current?.setBodyContent(this.renderModalContent(customIndicator));
    this.props.bottomSheetRef.current?.setSnapPoints(customIndicatorModalSnapPoints)
    setTimeout(() => {
      this.props.formModalRef.current?.present();
    }, 50);
  }

  renderList = () => {
    return this.props.proposedIndicators.map((proposedIndicator, index) => {
      const indicator = Indicator.findByIndicatorableId(proposedIndicator.indicatorable_id, proposedIndicator.indicatorable_type, this.props.endpointId)
      if (!!indicator)
        return <ProposeNewIndicatorCardItem key={proposedIndicator.uuid} scorecardUuid={this.props.scorecardUuid} searchedText=''
                  indicatorName={indicator.name} indicatorableId={proposedIndicator.indicatorable_id} indicatorType={indicator.type} indicatorUuid={indicator.indicator_uuid}
                  updateListRef={(ref) => this.listRef[index] = ref}
                  onSwipeableOpen={() => this.handleCloseRow(index) }
                  onPressItem={() => this.props.isIndicatorBase && this.editProposedIndicator(indicator, proposedIndicator.indicatorable_id, index)}
                  onPressEdit={() => this.showCustomIndicatorModal(indicator, index)}
                  onPressDelete={() => this.openConfirmationModal(proposedIndicator.indicatorable_id, index)}
                  isIndicatorBase={this.props.isIndicatorBase}
                  playingUuid={this.props.playingUuid}
                  updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
              />
    })
  }

  openConfirmationModal = (indicatorableId, index) => {
    this.selectedIndicatorableId = indicatorableId
    this.setState({visibleModal: true})
    this.listRef[index].close()
  }

  confirmDelete = () => {
    this.props.isIndicatorBase ? ProposedIndicator.deleteByIndicator(this.props.scorecardUuid, this.selectedIndicatorableId)
                               : ProposedIndicator.deleteByIndicatorByParticipant(this.props.scorecardUuid, this.selectedIndicatorableId, this.props.participantUuid)
    this.selectedIndicatorableId = null
    this.setState({visibleModal: false})
    this.props.updateProposedIndicator();
  }

  render() {
    const {translations} = this.context
    return (
      <View style={{flex: 1, marginTop: this.props.isIndicatorBase ? getDeviceStyle(110, 100) : getDeviceStyle(195, 170)}}>
        { this.props.proposedIndicators.length == 0 ? <EmptyListAction title={translations.noIndicatorProposed} hideButton={true} contentContainerStyle={{zIndex: -2, flexGrow: 1, justifyContent: 'center', paddingTop: 26}} />
          :
          <React.Fragment>
            <View style={{paddingTop: 6}}>{this.renderList()}</View>
            <CustomAlertMessage
              visible={this.state.visibleModal}
              title={translations.deleteTheProposedIndicators}
              description={translations.doYouWantToDeleteThisProposedIndicator}
              closeButtonLabel={translations.close}
              hasConfirmButton={true}
              confirmButtonLabel={translations.ok}
              isConfirmButtonDisabled={false}
              onDismiss={() => this.setState({visibleModal: false, selectedParticipant: null})}
              onConfirm={() => this.confirmDelete()}
            />
          </React.Fragment>
        }
      </View>
    )
  }
}

export default ProposeNewIndicatorProposedList