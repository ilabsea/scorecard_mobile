import React, {Component} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';

import { LocalizationContext } from '../Translations';
import ScorecardListIcon from './ScorecardListIcon';
import ScorecardListInfo from './ScorecardListInfo';

import Color from '../../themes/color';
import uuidv4 from '../../utils/uuidv4';
import Scorecard from '../../models/Scorecard';

import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardItemTabletStyles from '../../styles/tablet/ScorecardItemComponentStyle';
import ScorecardItemMobileStyles from '../../styles/mobile/ScorecardItemComponentStyle';

const responsiveStyles = getDeviceStyle(ScorecardItemTabletStyles, ScorecardItemMobileStyles);

export default class ScorecardItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.itemRef = null;
    this.state = {
      hasMatchedEndpointUrl: false,
      isDeleteable: false,
    }
  }

  componentDidMount() {
    this.checkCondition();
  }

  async checkCondition() {
    this.setState({
      hasMatchedEndpointUrl: await Scorecard.hasMatchedEndpointUrl(this.props.scorecard.uuid),
      isDeleteable: await Scorecard.isDeleteable(this.props.scorecard)
    });
  }

  deleteScorecard = () => {
    this.props.showDeleteModal();
    this.itemRef.close();
  }

  renderDeleteAction = () => {
    return (
      <RectButton onPress={() => this.deleteScorecard()} style={responsiveStyles.deleteContainer}>
        <Text style={[{color: Color.whiteColor}, responsiveStyles.deleteLabel]}>{ this.context.translations.delete }</Text>
      </RectButton>
    )
  }

  render() {
    let scorecard = this.props.scorecard || {};

    return (
      <Swipeable key={uuidv4()}
        ref={ref => { this.itemRef = ref }}
        enabled={this.state.isDeleteable}
        renderRightActions={this.renderDeleteAction}
      >
        <TouchableOpacity onPress={this.props.onPress} style={responsiveStyles.itemContainer} >
          <ScorecardListIcon scorecard={scorecard} hasMatchedEndpointUrl={this.state.hasMatchedEndpointUrl} />
          <ScorecardListInfo scorecard={scorecard} />
        </TouchableOpacity>
      </Swipeable>
    )
  }
}