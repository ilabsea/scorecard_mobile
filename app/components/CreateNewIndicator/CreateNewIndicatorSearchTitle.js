import React, { Component } from 'react';
import { Body, Title, Right, Icon, Button } from 'native-base';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

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
          <Button transparent onPress={() => this.props.toggleSearch()}>
            <Icon name='search' style={styles.searchIcon} />
          </Button>
        </Right>
      </React.Fragment>
    )
  }
}

export default CreateNewIndicatorSearchTitle;