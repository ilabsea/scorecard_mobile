import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../themes/color';
import { mdLabelSize, smLabelSize, mdIconSize } from '../../constants/mobile_font_size_constant';
import { buttonBorderRadius, cardBorderRadius } from '../../constants/border_radius_constant';

export const badgeSize = wp('9%');

const MilestoneCardComponentStyles = StyleSheet.create({
  badgeIconContainer: {
    backgroundColor: '#003b5c',
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeIcon: {
    fontSize: wp(mdIconSize),
    color: Color.whiteColor,
  },
  badgeText: {
    fontSize: wp(mdLabelSize),
    color: Color.whiteColor,
    fontWeight: 'bold'
  },
  card: {
    marginLeft: 10,
    height: 65,
    alignItems: 'center',
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    borderRadius: cardBorderRadius
  },
  cardTitleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  cardTitle: {
    color: Color.grayColor,
    fontSize: wp(mdLabelSize),
    lineHeight: 34
  },
  cardSubTitle: {
    fontSize: wp(smLabelSize),
    color: Color.grayColor
  },
  viewDetailText: {
    fontSize: wp(smLabelSize),
    color: Color.headerColor
  },
  viewDetailIcon: {
    fontSize: wp('4%'),
    color: Color.headerColor
  },
  btnResume: {
    backgroundColor: Color.headerColor,
    height: 48,
    width: wp('18%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: buttonBorderRadius
  },
  btnResumeText: {
    color: Color.whiteColor,
    fontSize: wp(smLabelSize)
  }
});

export default MilestoneCardComponentStyles;