import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Body, Title, Left, Icon, Button, Item, Input } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import IndicatorService from '../../services/indicator_service';

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
    !!this.props.onBackPress && this.props.onBackPress()
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
    this.setState({ isSearch: false });
  }

  _renderSearchBox() {
    const {translations} = this.context;

    return (
      <React.Fragment>
        <Item style={{marginRight: 4}}>
          <Input
            autoFocus={true}
            placeholder={ translations.searchCriteria }
            value={this.state.query}
            onChangeText={(text) => this.onChangeSearch(text)}
            clearButtonMode='always'
            style={styles.searchInput}
          />

          <TouchableOpacity onPress={() => this.clearSearch()} style={{width: 25}}>
            <Icon name="close" style={{fontSize: 20, paddingLeft: 0, paddingRight: 0}} />
          </TouchableOpacity>
        </Item>

        <Button transparent onPress={() => this.cancel()}>
          <Text style={{color: '#fff',}}>{ translations.cancel }</Text>
        </Button>
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
          <Button transparent onPress={() => this.setState({ isSearch: true })}>
            <Icon name='search' style={styles.searchIcon} />
          </Button>
        </View>
      </React.Fragment>
    )
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
    marginTop: -3,
    marginRight: getDeviceStyle(16, 0)
  },
  searchInput: {
    fontFamily: FontFamily.body,
    fontSize: 14
  }
});

export default SearchableHeader;