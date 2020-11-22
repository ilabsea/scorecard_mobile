import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon, Button} from 'native-base';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {LocalizationContext} from '../../components/Translations';
class NoUserListing extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
  }

  render() {
    const {translations} = this.context;
    return (
      <View style={styles.container}>
        <FeatherIcon name="file" style={styles.iconStyle} />
        <Text style={styles.heading}>{translations['noUserListing']}</Text>
        <Text>{translations['thereIsNoScorecardVotingYet']}</Text>
        <Text>{translations['pleaseCreateTheVoteBelow']}</Text>
        <Button iconLeft primary style={styles.button}
          onPress={() => this.props.openCreateNewIndicatorScreen()}>
          <Icon name="add" />
          <Text style={styles.buttonLabel}>{translations['addNewUser']}</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#22354c',
  },
  iconStyle: {
    color: '#e1e0e1',
    fontSize: 100,
  },
  button: {
    height: 50,
    paddingRight: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonLabel: {
    textTransform: 'uppercase',
    color: 'white',
    marginLeft: 12,
    fontSize: 18,
  },
});

export default NoUserListing;