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

  render() {
    return (
      <React.Fragment>
        <Body style={styles.body}>
          <Title style={styles.titleLabel}>
            { this.context.translations.createNewProposedCriteria }
          </Title>
        </Body>

        <Right style={styles.right}>
          <TouchableOpacity style={styles.btn} onPress={() => this.props.toggleSearch(true)}>
            <Icon name={'pen'} type="FontAwesome5" style={styles.editIcon}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => this.props.toggleSearch(false)}>
            <Icon name='search' style={styles.searchIcon} />
          </TouchableOpacity>
        </Right>
      </React.Fragment>
    )
  }
}

export default CreateNewIndicatorSearchTitle;