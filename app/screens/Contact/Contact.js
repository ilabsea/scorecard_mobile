import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import ContactListItem from '../../components/Contact/ContactListItem';
import contacts from '../../db/jsons/contacts';

import Color from '../../themes/color';

export default class Contact extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{padding: 16}}>
        { contacts.map((item, index) => <ContactListItem contact={item} key={index}/>) }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
