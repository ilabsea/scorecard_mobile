import React, {Component} from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import NewScorecardForm from './NewScorecardForm';
import Color from '../../themes/color';
import Brand from '../Home/Brand';
import Logos from '../Home/Logos';

class NewScorecardContent extends Component {
  constructor(props) {
    super(props);
  }

  renderForm() {
    return (
      <NewScorecardForm
        scorecardRef={this.props.scorecardRef}
        errorMsg={this.props.errorMsg}
        messageType={this.props.messageType}
        joinScorecard={this.props.joinScorecard}
        navigation={this.props.navigation}
        handleInvalidUrl={this.props.handleErrorScorecard}
        isLocked={this.props.isLocked}
        unlockAt={this.props.unlockAt}
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        <Spinner
          visible={this.props.isLoading}
          color={Color.primaryColor}
          overlayColor={Color.loadingBackgroundColor}
        />

        <View style={{flex: 3}}></View>

        <Brand/>
        { this.renderForm() }
        <Logos />
      </React.Fragment>
    )
  }
}

export default NewScorecardContent;