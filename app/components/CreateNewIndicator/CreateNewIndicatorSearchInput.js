import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Item, Input } from 'native-base';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import { getDeviceStyle } from '../../utils/responsive_util';
import createNewIndicatorSearchInputTabletStyles from '../../styles/tablet/CreateNewIndicatorSearchInputComponentStyle';
import createNewIndicatorSearchInputMobileStyles from '../../styles/mobile/CreateNewIndicatorSearchInputComponentStyle';
const styles = getDeviceStyle(createNewIndicatorSearchInputTabletStyles, createNewIndicatorSearchInputMobileStyles);

class CreateNewIndicatorSearchInput extends Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <React.Fragment>
        <Item style={styles.container}>
          <Input
            autoFocus={true}
            placeholder={ this.context.translations.searchCriteria }
            value={this.props.query}
            onChangeText={(text) => this.props.onChangeSearch(text)}
            clearButtonMode='always'
            style={styles.searchInput}
            placeholderTextColor='#ebebeb'
            spellCheck={false}
            autoCorrect={false}
            selectionColor="#fff"
          />

          { this.props.query != '' &&
            <TouchableOpacity onPress={() => this.props.clearSearch()} style={{width: 25, backgroundColor: Color.headerColor, marginRight: -6}}>
              <Icon name="close" style={{fontSize: 25, paddingLeft: 0, paddingRight: 0, marginTop: 0, color: 'white'}} />
            </TouchableOpacity>
          }
        </Item>
      </React.Fragment>
    )
  }
}

export default CreateNewIndicatorSearchInput;