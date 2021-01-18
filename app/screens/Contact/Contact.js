import React, {Component} from 'react';

import { ScrollView } from 'react-native';
import { LocalizationContext } from '../../components/Translations';
import ContactListItem from '../../components/Contact/ContactListItem';
import contacts from '../../db/jsons/contacts';
import contactService from '../../services/contact_service';
import { Linking } from 'react-native'

export default class Contact extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      contacts: contactService.getAll() || contacts
    };
  }

  callOrEmailTo = (contact) => {
    let linkTo = { tel: 'tel', email: 'mailto' };

    Linking.openURL(`${linkTo[contact.contact_type]}:${contact.value}`);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{padding: 16}}>
        { this.state.contacts.map((item, index) =>
          <ContactListItem contact={item} key={index} onPress={(contact) => this.callOrEmailTo(contact)}/>
        )}
      </ScrollView>
    );
  }
}
