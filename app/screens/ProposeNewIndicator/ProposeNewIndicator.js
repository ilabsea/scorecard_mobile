import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import ProposeNewIndicatorSearchBox from '../../components/ProposeNewIndicator/ProposeNewIndicatorSearchBox';
import EmptyListAction from '../../components/Share/EmptyListAction';
import BoldLabel from '../../components/Share/BoldLabel';
import { containerPadding } from '../../utils/responsive_util';
import ProposedIndicator from '../../models/ProposedIndicator';

class ProposeNewIndicator extends React.Component {
  static contextType = LocalizationContext;
  state = {proposedIndicators: []}
  componentDidMount() {
    this.setState({proposedIndicator: ProposedIndicator.getAllByScorecard(this.props.route.params.scorecard_uuid)})
  }

  render() {
    const {translations} = this.context
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flexGrow: 1, padding: containerPadding, paddingTop: 15}}>
          <ProposeNewIndicatorSearchBox scorecardUuid={this.props.route.params.scorecard_uuid} />
          <BoldLabel label={`${translations.proposedIndicator}: ${this.state.proposedIndicators.length}`} customStyle={{marginTop: 10}} />
          <EmptyListAction title={translations.noIndicatorProposed} hideButton={true}
            contentContainerStyle={{borderWidth: 0, flexGrow: 1, justifyContent: 'center'}}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ProposeNewIndicator