import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';

import CustomStyle from '../../themes/customStyle';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import { hasVoting } from '../../helpers/voting_criteria_helper';

import uuidv4 from '../../utils/uuidv4';

class VotingInfoModal extends Component {
  static contextType = LocalizationContext;

  _renderSummaryItem(value, index, isInline) {
    const { translations } = this.context;
    const labels = ['female', 'disability', 'minority', 'poor', 'youth'];
    let doms = [];

    if (value > 0) {
      doms.push(
        <View key={uuidv4()}
          style={[{flexDirection: 'row'}, this.itemContainerStyle(isInline)]}
        >
          <Text style={this.itemLabelStyle(isInline)}>{ translations[labels[index]] }</Text>
          <Text style={[this.itemLabelStyle(isInline), !isInline ? {fontWeight: 'bold', fontSize: 18} : {}]}> ({ value })</Text>

          { index < labels.length -1 && isInline &&
            <Text key={uuidv4()}> | </Text>
          }
        </View>
      )
    }

    return doms;
  }

  itemContainerStyle = (isInline) => {
    if (!isInline)
      return { width: '100%', borderBottomWidth: 1, borderColor: '#dad6d6', paddingTop: 6, paddingBottom: 10 };

    return {};
  }

  itemLabelStyle  = (isInline) => {
    if (!isInline)
      return { fontSize: 16, flex: 1 };

    return { fontSize: 14 }
  }

  _renderSummaryInfo() {
    let doms = [];

    for(let i=0; i<this.props.votingInfos.length; i++) {
      doms.push(
        <View key={uuidv4()} style={{marginBottom: 5, flexDirection:'row'}}>
          { this._renderSummaryItem(this.props.votingInfos[i].average_score, i, false) }
        </View>
      );
    }

    return (<View>{doms}</View>);
  }

  _renderParticipantInformation() {
    let doms = [];
    const {
      number_of_female, number_of_disability, number_of_ethnic_minority,
      number_of_id_poor, number_of_youth,
    } = this.props.scorecard;
    const participantInfos = [number_of_female, number_of_disability, number_of_ethnic_minority, number_of_id_poor, number_of_youth];

    for(let i=0; i<participantInfos.length; i++) {
      doms.push(this._renderSummaryItem(participantInfos[i], i, true))
    }

    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        { doms }
      </View>
    );
  }

  _renderParticipantInformationSection() {
    const { translations } = this.context;

    return (
      <View style={{marginBottom: 40}}>
        <Text style={{marginBottom: 5, fontFamily: FontFamily.title, fontSize: 18}}>
          { translations.participantInformation }:
        </Text>
        <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
          {this._renderParticipantInformation()}
        </View>
      </View>
    )
  }

  _renderSummaryInfoSection() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={{fontFamily: FontFamily.title, fontSize: 18, marginBottom: 10}}>{ translations.averageScoreByGroup }:</Text>

        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          { this._renderSummaryInfo() }
        </View>
      </View>
    );
  }

  _renderContent() {
    if (hasVoting(this.props.scorecard.uuid)) {
      return (
        <View>
          { this._renderParticipantInformationSection() }

          { this._renderSummaryInfoSection() }
        </View>
      )
    }

    const { translations } = this.context;
    return (
      <Text style={{paddingHorizontal: 10}}>{ translations.thereIsNoVotingYet }</Text>
    );
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal
          visible={this.props.visible}
          onDismiss={this.props.onDismiss}
          contentContainerStyle={[CustomStyle.modalContainer, { width: '90%' }]}
        >
          <Text style={CustomStyle.modalTitle}>
            { translations.votingDetail }
          </Text>

          {this._renderContent()}

          <View style={CustomStyle.modalBtnWrapper}>
            <CloseButton onPress={this.props.onDismiss} label={translations.close} />
          </View>
        </Modal>
      </Portal>
    );
  }
}

export default VotingInfoModal;