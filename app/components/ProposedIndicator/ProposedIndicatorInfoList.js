import React, { Component } from 'react';
import { View } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import AccordionSwitcher from '../AccordionSwitcher/AccordionSwitcher';
import ProposedIndicatorRaisedIndicatorList from './ProposedIndicatorRaisedIndicatorList';
import ProposedIndicatorRaisedParticipantList from './ProposedIndicatorRaisedParticipantList';
import EmptyListAction from '../Share/EmptyListAction';

import { ACCORDION_LEFT, ACCORDION_RIGHT } from '../../constants/main_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedIndicatorTabletStyles from '../../styles/tablet/ProposedIndicatorComponentStyle';
import ProposedIndicatorMobileStyles from '../../styles/mobile/ProposedIndicatorComponentStyle';

const responsiveStyles = getDeviceStyle(ProposedIndicatorTabletStyles, ProposedIndicatorMobileStyles);

class ProposedIndicatorInfoList extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.state = {
      listType: props.isIndicatorBase ? 'indicator' : 'participant'
    }
  }

  renderAccordionSwitcher() {
    const { translations } =  this.context;
    const tabs = {
      indicatorBase: {left_label: translations.raisedIndicator, left_type: 'indicator', right_label: translations.raisedParticipant, right_type: 'participant'},
      participantBase: {left_label: translations.raisedParticipant, left_type: 'participant', right_label: translations.raisedIndicator, right_type: 'indicator'}
    }
    const tab = tabs[this.props.isIndicatorBase ? 'indicatorBase' : 'participantBase']

    return (
      <AccordionSwitcher
        scorecardUuid={this.props.scorecardUuid}
        leftLabel={ tab.left_label }
        rightLabel={ tab.right_label }
        activeSide={this.state.listType == tab.left_type ? ACCORDION_LEFT : ACCORDION_RIGHT}
        onPressLeft={() => this.setState({ listType: tab.left_type })}
        onPressRight={() => this.setState({ listType: tab.right_type })}
        numberOfProposedParticipant={this.props.numberOfProposedParticipant}
      />
    )
  }

  renderEmptyListAction() {
    const {translations} = this.context;

    return (
      <View style={{height: '100%', paddingTop: hp('10%')}}>
        <EmptyListAction
          title={translations.pleaseProposeIndicator}
          buttonLabel={translations.proposeNewIndicator}
          onPress={() => this.props.startProposeIndicator()}
          customContainerStyle={responsiveStyles.noDataContainer}
        />
      </View>
    )
  }

  render() {
    return (
      <React.Fragment>
        { this.renderAccordionSwitcher() }
        { this.props.raisedParticipants.length == 0 && this.renderEmptyListAction() }
        { this.state.listType == 'participant' ?
          <ProposedIndicatorRaisedParticipantList scorecardUuid={this.props.scorecardUuid} participantModalRef={this.props.participantModalRef} formModalRef={this.props.formModalRef} />
          :
          <ProposedIndicatorRaisedIndicatorList scorecardUuid={this.props.scorecardUuid} participantModalRef={this.props.participantModalRef} formModalRef={this.props.formModalRef} />
        }
      </React.Fragment>
    )
  }
}

export default ProposedIndicatorInfoList;