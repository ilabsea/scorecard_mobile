import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import realm from '../../db/schema';
import { LocalizationContext } from '../../components/Translations';
import { Icon } from 'native-base';
import Color from '../../themes/color';

export default class ScorecardList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      translations: {},
      scorecards: realm.objects('Scorecard')
    };
  }

  componentDidMount() {
    const { translations } = this.context
    this.setState({translations: translations});
  }

  renderList(scorecards) {
    let doms = [];

    for(let i=0; i<scorecards.length; i++) {
      doms.push(
        <TouchableOpacity
          key={i}
          onPress={ () => console.log('go to detail') }
          style={[styles.listItem, styles.card]}>

          <View style={styles.statusIconWrapper}>
            <Icon name='checkmark' style={{fontSize: 60, color: '#fff'}} />
          </View>

          <View style={styles.contentWrapper}>
            <Text style={styles.title}>ID: {scorecards[i].name}</Text>

            <View style={styles.subTextWrapper}>
              <Icon name='people' style={styles.subTextIcon} />
              <Text style={styles.subText}>Number of indicator: 20</Text>
            </View>

            <View style={styles.subTextWrapper}>
              <Icon name='document-text' style={styles.subTextIcon} />
              <Text style={styles.subText}>Status: {scorecards[i].status}</Text>
            </View>

            <View style={{flex: 1}}></View>

            <View style={{height: 48, borderTopWidth: 1, borderTopColor: Color.borderColor, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
              <Text style={{color: Color.headerColor}}>VIEW DETAIL</Text>
              <Icon name='chevron-forward-outline' style={{fontSize: 24, color: Color.headerColor}} />
            </View>

          </View>
        </TouchableOpacity>
      )
    }

    return doms;
  }

  _renderNoData() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 24}}>{this.state.translations['noData']}</Text>
      </View>
    );
  }

  render() {
    if (!this.state.scorecards.length) {
      return this._renderNoData();
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          { this.renderList(this.state.scorecards)}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: '#3a3a3a',
    marginBottom: 6
  },
  subTextWrapper: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center'
  },
  subText: {
    marginLeft: 8,
    fontSize: 14
  },
  subTextIcon: {
    fontSize: 24,
    color: Color.subText
  },
  contentWrapper: {
    paddingLeft: 20,
    paddingTop: 10,
    flex: 1
  },
  statusIconWrapper: {
    width: 160,
    backgroundColor: '#003b5c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    height: 160,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 4,
    flexDirection: 'row',
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  }
});
