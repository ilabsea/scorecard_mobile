import React, {Component} from 'react';
import { ScrollView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
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
      contacts: [],
    }
  }

  async componentDidMount() {
    NetInfo.fetch().then(state => {
      let localContacts = contactService.getAll();

      if (localContacts.length == 0 && !state.isConnected)
        this.setState({ contacts: contacts });
      else if (localContacts.length > 0)
        this.setState({ contacts: localContacts });
      else {
        contactService.downloadContacts(() => {
          this.setState({ contacts: contactService.getAll() });
        });
      }
    });
  }

  callOrEmailTo = (contact) => {
    let linkTo = { tel: 'tel', email: 'mailto' };

    Linking.openURL(`${linkTo[contact.contact_type]}:${contact.value}`);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{padding: 16, flexGrow: 1}}>
        { this.state.contacts.map((item, index) =>
          <ContactListItem contact={item} key={index} onPress={(contact) => this.callOrEmailTo(contact)}/>
        )}
      </ScrollView>
    );
  }
}
