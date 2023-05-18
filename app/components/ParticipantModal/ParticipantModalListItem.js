import React, { Component } from 'react';
import { Divider } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import styles from '../../themes/participantListItemStyle';

import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import BottomSheetPicker from '../Share/BottomSheetPicker';
import {locales} from '../../constants/locale_constant';

export default class ParticipantModalListItem extends Component {
  static contextType = LocalizationContext;

  onPress(item) {
    !!this.props.onPress && !!this.props.onPress(item.uuid);
  }

  renderParticipantListItemInfo() {
    return <ParticipantListItemInfo
              participant={this.props.participant}
              onPress={() => this.onPress(this.props.participant)}
              containerStyle={[styles.participantItem, this.props.containerStyle]}
              rightIcon={this.props.rightIcon}
              hasArrowIcon={this.props.hasArrowIcon}
              anonymousStyle={{marginRight: 0}}
              arrowIconStyle={this.props.arrowIconStyle}
           />
  }

  renderParticipantItem() {
    if (this.props.isOutlined) {
      return <BottomSheetPicker title={this.context.translations.votingParticipantLabel}>
                {this.renderParticipantListItemInfo()}
              </BottomSheetPicker>
    }

    return (
      <React.Fragment>
        {this.renderParticipantListItemInfo()}
        { !this.props.hideDivider && <Divider /> }
      </React.Fragment>
    );
  }

  render() {
    return this.renderParticipantItem();
  }
}