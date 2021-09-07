import React, { Component } from 'react';
// import { StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Body, Title, Left, Right, Icon, Button, Item, Input } from 'native-base';
import { HeaderBackButton } from '@react-navigation/stack';
// import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import CreateNewIndicatorSearchTitle from './CreateNewIndicatorSearchTitle';
import CreateNewIndicatorSearchInput from './CreateNewIndicatorSearchInput';
// import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
// import { FontFamily } from '../../assets/stylesheets/theme/font';
import IndicatorService from '../../services/indicator_service';

import { getDeviceStyle, mobileHeadingTitleSize, isShortWidthScreen, navigationBackButtonFlex } from '../../utils/responsive_util';

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

  // clearSearch() {
  //   this.onChangeSearch('');
  // }

  cancel() {
    // this.clearSearch();
    this.onChangeSearch('');
    this.toggleSearch(false);
  }

  _renderSearchBox() {
    return (
      <CreateNewIndicatorSearchInput
        query={this.state.query}
        onChangeSearch={(text) => this.onChangeSearch(text)}
        clearSearch={() => this.onChangeSearch('')}
      />
    )

    // const { translations } = this.context;
    // const mobileMarginLeft = isShortWidthScreen() ? -6 : -16;

    // return (
    //   <React.Fragment>
    //     <Item style={{marginLeft: getDeviceStyle(-wp('10%'), mobileMarginLeft), marginRight: 4, backgroundColor: Color.headerColor}}>
    //       <Input
    //         autoFocus={true}
    //         placeholder={ translations.searchCriteria }
    //         value={this.state.query}
    //         onChangeText={(text) => this.onChangeSearch(text)}
    //         clearButtonMode='always'
    //         style={styles.searchInput}
    //         placeholderTextColor='#ebebeb'
    //         spellCheck={false}
    //         autoCorrect={false}
    //         selectionColor="#fff"
    //       />

    //       { this.state.query != '' &&
    //         <TouchableOpacity onPress={() => this.clearSearch()} style={{width: 25, backgroundColor: Color.headerColor, marginRight: -6}}>
    //           <Icon name="close" style={{fontSize: 25, paddingLeft: 0, paddingRight: 0, marginTop: 0, color: 'white'}} />
    //         </TouchableOpacity>
    //       }
    //     </Item>
    //   </React.Fragment>
    // )
  }

  _renderTitle() {
    // const {translations} = this.context;
    // const mobileBodyPaddingLeft = isShortWidthScreen() ? wp('4%') : wp('1%');

    return (
      <CreateNewIndicatorSearchTitle toggleSearch={() => this.toggleSearch(true)} />

      // <React.Fragment>
      //   <Body style={{flex: getDeviceStyle(2, 1), paddingLeft: getDeviceStyle(wp('1.4%'), mobileBodyPaddingLeft)}}>
      //     <Title style={styles.titleLabel}>{ translations.createNewProposedCriteria }</Title>
      //   </Body>

      //   <Right style={{maxWidth: wp('14%'), marginRight: getDeviceStyle(-19, -6), alignItems: 'center'}}>
      //     <Button transparent onPress={() => this.toggleSearch(true)}>
      //       <Icon name='search' style={styles.searchIcon} />
      //     </Button>
      //   </Right>
      // </React.Fragment>
    )
  }

  toggleSearch(status) {
    this.setState({ isSearch: status });
    this.props.updateSearchStatus(status);
  }

  render() {
    return (
      <Header searchBar>
        <Left style={{flex: navigationBackButtonFlex, marginLeft: getDeviceStyle(-10, 0), justifyContent: 'center'}}>
          <HeaderBackButton tintColor={"#fff"} onPress={() => this._onPress()} style={{ marginLeft: getDeviceStyle(11, 0) }} />
        </Left>
        { !this.state.isSearch ? this._renderTitle() : this._renderSearchBox() }
      </Header>
    )
  }
}

// const styles = StyleSheet.create({
  // titleLabel: {
  //   fontSize: getDeviceStyle(19, mobileHeadingTitleSize()),
  //   fontFamily: FontFamily.title
  // },
  // searchIcon: {
  //   fontSize: getDeviceStyle(24, wp('6%')),
  //   marginRight: getDeviceStyle(16, 0)
  // },
  // searchInput: {
  //   fontFamily: FontFamily.body,
  //   fontSize: getDeviceStyle(19, mobileHeadingTitleSize()),
  //   color: '#fff',
  //   borderWidth: 0,
  //   width: '100%',
  //   justifyContent: 'center',
  //   marginTop: getDeviceStyle(4, 2),
  //   paddingTop: 0,
  //   paddingBottom: 0,
  // }
// });

export default SearchableHeader;