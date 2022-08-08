import React from 'react';
import { Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import ProposedIndicator from '../../models/ProposedIndicator';

class ProposedIndicatorParticipant extends React.Component {
  static contextType = LocalizationContext;

  renderAnonymous() {
    return <Text style={this.props.labelStyle}>
              {` (`}{this.context.translations.anonymous}{` `}
              <Text style={this.props.numberStyle}>
                { ProposedIndicator.getNumberAnonymousProposeByIndicator(this.props.scorecardUuid, this.props.indicator.indicatorable_id) }
              </Text>)
           </Text>
  }

  render() {
    const { translations } = this.context;
    const hasAnonymousProposed = ProposedIndicator.hasAnonymousProposed(this.props.scorecardUuid, this.props.indicator.indicatorable_id);
    const numberOfProoposedParticipant = ProposedIndicator.findByIndicator(this.props.scorecardUuid, this.props.indicator.indicatorable_id).length;

    return <React.Fragment>
              <Text style={this.props.labelStyle}>
                { this.props.label }
                <Text style={this.props.numberStyle}> { numberOfProoposedParticipant } </Text>
                { translations.pax }
                { hasAnonymousProposed && this.renderAnonymous() }
              </Text>
            </React.Fragment>
  }
}

export default ProposedIndicatorParticipant;