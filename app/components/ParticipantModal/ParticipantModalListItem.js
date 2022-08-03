import React, { Component } from 'react';
import { Divider } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import styles from '../../themes/participantListItemStyle';

import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';

export default class ParticipantModalListItem extends Component {
  static contextType = LocalizationContext;

  onPress(item) {
    !!this.props.onPress && !!this.props.onPress(item.uuid);
  }

  renderParticipantItem() {
    return (
      <React.Fragment>
        <ParticipantListItemInfo
          participant={this.props.participant}
          onPress={() => this.onPress(this.props.participant)}
          containerStyle={styles.participantItem}
          rightIcon={this.props.rightIcon}
          hasArrowIcon={this.props.hasArrowIcon}
          anonymousStyle={{marginRight: 0}}
        />
        <Divider />
      </React.Fragment>
    );
  }

  render() {
    return this.renderParticipantItem();
  }
}