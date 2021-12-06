import React, {Component} from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { LocalizationContext } from '../../components/Translations';
import ContactListItem from '../../components/Contact/ContactListItem';
import MessageModal from '../../components/MessageModal';
import NoDataMessage from '../../components/NoDataMessage';
import contacts from '../../db/jsons/contacts';
import contactService from '../../services/contact_service';

import { Linking } from 'react-native'

export default class Contact extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      visibleModal: false,
      isLoading: false,
    }
  }

  async componentDidMount() {
    this.loadContact();
  }

  loadContact() {
    const localContacts = contactService.getAll();

    NetInfo.fetch().then(state => {
      if (localContacts.length == 0 && !state.isConnected)
        this.setState({ contacts: contacts });
      else if (localContacts.length > 0)
        this.setState({ contacts: localContacts });
      else {
        contactService.downloadContacts(() => {
          this.setState({ contacts: contactService.getAll() });
        }, () => {
          this.setState({
            visibleModal: true
          });
        });
      }
    });
  }

  callOrEmailTo = (contact) => {
    let linkTo = { tel: 'tel', email: 'mailto' };

    Linking.openURL(`${linkTo[contact.contact_type]}:${contact.value}`);
  }

  renderNoContacts = () => {
    return (
      <NoDataMessage
        title={ this.context.translations.unableToGetContacts }
        buttonLabel={ this.context.translations.getContacts }
        onPress={() => this.loadContact()}
      />
    )
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{padding: 16, flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => this.loadContact()}
          />
        }
      >
        { this.state.contacts.length === 0 && this.renderNoContacts() }

        { this.state.contacts.map((item, index) =>
          <ContactListItem contact={item} key={index} onPress={(contact) => this.callOrEmailTo(contact)}/>
        )}

        <MessageModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({ visibleModal: false })}
          description={this.context.translations.errorDownloadContact}
          hasConfirmButton={false}
          confirmButtonLabel={this.context.translations.ok}
          onPressConfirmButton={() => this.props.confirmDelete()}
        />
      </ScrollView>
    );
  }
}
