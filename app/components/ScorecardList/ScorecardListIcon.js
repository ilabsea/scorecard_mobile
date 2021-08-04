import React, {Component} from 'react';
import { View } from 'react-native';
import AppIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import scorecardHelper from '../../helpers/scorecard_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardItemTabletStyles from '../../styles/tablet/ScorecardItemComponentStyle';
import ScorecardItemMobileStyles from '../../styles/mobile/ScorecardItemComponentStyle';

const responsiveStyles = getDeviceStyle(ScorecardItemTabletStyles, ScorecardItemMobileStyles);

class ScorecardListIcon extends Component {
  render() {
    const icon = scorecardHelper.getScorecardIcon(this.props.scorecard);

    return (
      <View style={[responsiveStyles.iconBorder, {borderColor: scorecardHelper.scorecardTypeColor(this.props.scorecard)}]}>
        { icon.name == 'check' ?
          <MaterialIcon name='check' size={24} color={icon.color} />
        :
          <AppIcon name={icon.name} size={20} color={icon.color} />
        }
      </View>
    )
  }
}

export default ScorecardListIcon;