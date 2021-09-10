import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Body, Title, Right, Icon } from 'native-base';

import { LocalizationContext } from '../Translations';
import { getDeviceStyle } from '../../utils/responsive_util';
import createNewIndicatorSearchTitleTabletStyles from '../../styles/tablet/CreateNewIndicatorSearchTitleComponentStyle';
import createNewIndicatorSearchTitleMobileStyles from '../../styles/mobile/CreateNewIndicatorSearchTitleComponentStyle';
const styles = getDeviceStyle(createNewIndicatorSearchTitleTabletStyles, createNewIndicatorSearchTitleMobileStyles);

class CreateNewIndicatorSearchTitle extends Component {
  static contextType = LocalizationContext;

  renderRightButtons() {
    if (this.props.isEdit)
      return;

    return (
      <Right style={styles.right}>
        <TouchableOpacity style={[styles.btn, styles.btnEdit]} onPress={() => this.props.editIndicator()}>
          <Icon name={'pen'} type="FontAwesome5" style={styles.editIcon}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => this.props.toggleSearch()}>
          <Icon name='search' style={styles.searchIcon} />
        </TouchableOpacity>
      </Right>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Body style={styles.body}>
          <Title style={styles.titleLabel}>
            { this.props.isEdit ? this.context.translations.editCustomIndicator : this.context.translations.createNewProposedCriteria }
          </Title>
        </Body>

        { this.renderRightButtons() }
      </React.Fragment>
    )
  }
}

export default CreateNewIndicatorSearchTitle;