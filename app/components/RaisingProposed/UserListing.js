import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import TipBox from './TipBox';
import ListProposedCriteria from './ListProposedCriteria';
import ListUser from './ListUser';
import ActionButton from '../ActionButton';
import {LocalizationContext} from '../../components/Translations';
import Color from '../../themes/color';
class UserListing extends Component {
  static contextType = LocalizationContext;
  renderFinishButton = () => {
    const {translations} = this.context;
    return (
      <View style={styles.buttonContainer}>
        <ActionButton
          label={translations['finish']}
          customBackgroundColor={Color.primaryButtonColor}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TipBox/>
        <ListProposedCriteria />
        <ListUser openCreateNewCriteriaScreen={() => this.props.openCreateNewCriteriaScreen()}/>
        {this.renderFinishButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default UserListing;