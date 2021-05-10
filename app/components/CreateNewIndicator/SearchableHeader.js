import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Body, Title, Left, Icon, Button, Item, Input } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import IndicatorService from '../../services/indicator_service';
import { english } from '../../constants/locale_constant';

import { getDeviceStyle, mobileHeadingTitleSize } from '../../utils/responsive_util';

class SearchableHeader extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      isSearch: false,
      query: ''
    };
  }

  _onPress() {
    if (!this.props.onBackPress)
      return

    if (this.state.isSearch)
      this.cancel();
    else
      this.props.onBackPress();
  }

  onChangeSearch(text) {
    const { translations } = this.context;
    this.setState({ query: text });
    const allIndicator = new IndicatorService().getIndicatorList(this.props.scorecardUuid, this.props.participantUuid, text, translations.addNewCriteria);

    this.props.updateSearchedIndicator(allIndicator.indicators, allIndicator.selectedIndicators);
  }

  clearSearch() {
    this.onChangeSearch('');
  }

  cancel() {
    this.clearSearch();
    this.toggleSearch(false);
  }

  _renderSearchBox() {
    const { translations, appLanguage } = this.context;
    const inputPaddingTop = appLanguage == english ? 10 : 12;

    return (
      <React.Fragment>
        <Item style={{marginRight: 4, backgroundColor: Color.headerColor}}>
          <Input
            autoFocus={true}
            placeholder={ translations.searchCriteria }
            value={this.state.query}
            onChangeText={(text) => this.onChangeSearch(text)}
            clearButtonMode='always'
            style={[styles.searchInput, { padingTop: inputPaddingTop } ]}
            placeholderTextColor='#ebebeb'
            spellCheck={false}
            autoCorrect={false}
            selectionColor="#fff"
          />

          { this.state.query != '' &&
            <TouchableOpacity onPress={() => this.clearSearch()} style={{width: 25, backgroundColor: Color.headerColor}}>
              <Icon name="close" style={{fontSize: 25, paddingLeft: 0, paddingRight: 0, marginTop: 0, color: 'white'}} />
            </TouchableOpacity>
          }
        </Item>
      </React.Fragment>
    )
  }

  _renderTitle() {
    const {translations} = this.context;

    return (
      <React.Fragment>
        <Body style={{justifyContent: 'center'}}>
          <Title style={styles.titleLabel}>{ translations.createNewProposedCriteria }</Title>
        </Body>

        <View style={{justifyContent: 'center'}}>
          <Button transparent onPress={() => this.toggleSearch(true)}>
            <Icon name='search' style={styles.searchIcon} />
          </Button>
        </View>
      </React.Fragment>
    )
  }

  toggleSearch(status) {
    this.setState({ isSearch: status });
    this.props.updateSearchStatus(status);
  }

  render() {
    return (
      <Header searchBar>
        <Left style={{justifyContent: 'center'}}>
          <HeaderBackButton tintColor={"#fff"} onPress={() => this._onPress()} style={{ marginLeft: getDeviceStyle(11, 0) }} />
        </Left>
        { !this.state.isSearch ? this._renderTitle() : this._renderSearchBox() }
      </Header>
    )
  }
}

const styles = StyleSheet.create({
  titleLabel: {
    fontSize: getDeviceStyle(19, mobileHeadingTitleSize())
  },
  searchIcon: {
    fontSize: getDeviceStyle(24, wp('6%')),
    marginRight: getDeviceStyle(16, 0)
  },
  searchInput: {
    fontFamily: FontFamily.body,
    fontSize: getDeviceStyle(19, mobileHeadingTitleSize()),
    color: '#fff',
    borderWidth: 0,
    width: '100%',
    justifyContent: 'center',
    marginTop: getDeviceStyle(4, 2),
    paddingTop: 0,
    paddingBottom: 0,
  }
});

export default SearchableHeader;