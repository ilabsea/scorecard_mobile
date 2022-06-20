import React, {Component} from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { LocalizationContext } from '../../components/Translations';
import ContactListItem from '../../components/Contact/ContactListItem';
import MessageModal from '../../components/MessageModal';
import EmptyListAction from '../../components/Share/EmptyListAction';
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
      modalMessage: null,
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
            visibleModal: true,
            modalMessage: this.context.translations.errorDownloadContact
          });
        });
      }
    });
  }

  callOrEmailTo = async (contact) => {
    let linkTo = { tel: 'tel', email: 'mailto' };
    const url = `${linkTo[contact.contact_type]}:${contact.value}`;

    Linking.canOpenURL(url).then(isSupported => {
      if (isSupported)
        Linking.openURL(url);
      else
        this.showInfoMessage(contact);
    }).catch(error => {
      this.showInfoMessage(contact);
    });
  }

  showInfoMessage(contact) {
    const infoMessages = {
      tel: this.context.translations.unableToMakeAContactWithThisPhoneNumber,
      email: this.context.translations.unableToMakeAContactWithThisEmailAddress,
    }

    this.setState({
      visibleModal: true,
      modalMessage: infoMessages[contact.contact_type]
    });
  }

  renderNoContacts = () => {
    return (
      <EmptyListAction
        title={ this.context.translations.unableToGetContacts }
        buttonLabel={ this.context.translations.syncContacts }
        onPress={() => this.loadContact()}
        icon="refresh"
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
          description={this.state.modalMessage}
          hasConfirmButton={false}
          confirmButtonLabel={this.context.translations.ok}
          onPressConfirmButton={() => this.props.confirmDelete()}
        />
      </ScrollView>
    );
  }
}
