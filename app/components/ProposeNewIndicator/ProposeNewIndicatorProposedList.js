import React from 'react';
import { ScrollView, View } from 'react-native';

import {LocalizationContext} from '../Translations';
import ProposeNewIndicatorCardItem from './ProposeNewIndicatorCardItem';
import EmptyListAction from '../Share/EmptyListAction';
import CustomAlertMessage from '../Share/CustomAlertMessage';
import Indicator from '../../models/Indicator';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';

class ProposeNewIndicatorProposedList extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.state = {
      visibleModal: false
    }
    this.listRef = []
    this.prevOpenedRow = null;
  }

  editProposedIndicator = (indicator, indicatorableId, index) => {
    let indicatorParams = indicator
    indicatorParams['indicatorable_id'] = indicatorableId
    const proposedIndicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: indicatorParams };
    proposedIndicatorHelper.showFormModal(this.props.bottomSheetRef, this.props.formModalRef, proposedIndicatorParams);
    this.listRef[index].close()
  }

  handleCloseRow = (index) => {
    if (this.prevOpenedRow && this.prevOpenedRow !== this.listRef[index])
      this.prevOpenedRow.close();

    this.prevOpenedRow = this.listRef[index];
  }

  renderList = () => {
    return this.props.proposedIndicators.map((proposedIndicator, index) => {
      const indicator = Indicator.findByIndicatorableId(proposedIndicator.indicatorable_id, this.props.endpointId)
      return <ProposeNewIndicatorCardItem key={proposedIndicator.uuid} scorecardUuid={this.props.scorecardUuid} audio={null} searchedText=''
                indicatorName={indicator.name} indicatorableId={proposedIndicator.indicatorable_id} indicatorType={indicator.type}
                updateListRef={(ref) => this.listRef[index] = ref}
                onSwipeableOpen={() => this.handleCloseRow(index) }
                onPressEdit={() => this.editProposedIndicator(indicator, proposedIndicator.indicatorable_id, index)}
                onPressDelete={() => this.openConfirmationModal(index)}
             />
    })
  }

  openConfirmationModal = (index) => {
    this.setState({visibleModal: true})
    this.listRef[index].close()
  }

  render() {
    const {translations} = this.context

    if (this.props.proposedIndicators.length == 0)
      return <EmptyListAction title={translations.noIndicatorProposed} hideButton={true} contentContainerStyle={{zIndex: -2, flexGrow: 1, justifyContent: 'center', paddingTop: 26}} />

    return (
      <View style={{flexGrow: 1, zIndex: -2}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {this.renderList()}
        </ScrollView>
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
      </View>
    )
  }
}

export default ProposeNewIndicatorProposedList