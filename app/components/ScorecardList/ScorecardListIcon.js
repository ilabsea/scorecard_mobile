import React, {Component} from 'react';
import { View } from 'react-native';
import AppIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Scorecard from '../../models/Scorecard';
import scorecardHelper from '../../helpers/scorecard_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardItemTabletStyles from '../../styles/tablet/ScorecardItemComponentStyle';
import ScorecardItemMobileStyles from '../../styles/mobile/ScorecardItemComponentStyle';

const responsiveStyles = getDeviceStyle(ScorecardItemTabletStyles, ScorecardItemMobileStyles);

class ScorecardListIcon extends Component {
  renderLockIcon() {
    const { owner, endpoint } = this.props.currentSignInData;

    if (!!owner && !Scorecard.hasValidOwnerAndEndpoint(this.props.scorecard.uuid, owner, endpoint))
      return <MaterialIcon name='error' size={16} color='#808080' style={{position: 'absolute', top: -2, right: 0, backgroundColor: 'white'}} />
  }

  render() {
    const icon = scorecardHelper.getScorecardIcon(this.props.scorecard);
    const scorecardColor = scorecardHelper.scorecardTypeColor(this.props.scorecard);

    return (
      <View style={[responsiveStyles.iconBorder, {borderColor: scorecardColor}]}>
        { icon.name == 'check' ?
          <MaterialIcon name='check' size={24} color={scorecardColor} />
        :
          <AppIcon name={icon.name} size={20} color={scorecardColor} />
        }
        
        { this.renderLockIcon() }
      </View>
    )
  }
}

export default ScorecardListIcon;