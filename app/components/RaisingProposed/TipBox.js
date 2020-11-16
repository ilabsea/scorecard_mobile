import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {LocalizationContext} from '../Translations';

class UserListing extends Component {
  static contextType = LocalizationContext;
  render() {
    const {translations} = this.context;
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcon name="lightbulb-outline" size={55} color="white" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{translations['tips']}</Text>
          <Text style={styles.content}>
            {translations['raisingProposedTipsContent']}
          </Text>
          <View style={styles.line} />
          <TouchableOpacity style={styles.viewTipsContainer}>
            <Text style={styles.viewTipsLabel}>{translations['viewTips']}</Text>
            <MaterialIcon name="arrow-forward-ios" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 2,
  },
  iconContainer: {
    backgroundColor: '#efb71c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 16,
    flexDirection: 'column',
    flex: 1,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3a3a3a',
  },
  content: {
    color: '#565656',
    fontSize: 12,
    marginTop: 12,
  },
  line: {
    borderBottomWidth: 0.5,
    borderColor: '#b9b9b9',
    marginTop: 10,
    marginBottom: 10,
  },
  viewTipsLabel: {
    color: '#565656',
    marginRight: 12,
    fontWeight: '700',
    textAlign: 'right',
    textTransform: 'uppercase',
  },
  viewTipsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default UserListing;
