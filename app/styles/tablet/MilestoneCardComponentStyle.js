import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { buttonBorderRadius, cardBorderRadius } from '../../constants/border_radius_constant';

export const badgeSize = 40;

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
    fontSize: 24,
    color: Color.whiteColor,
  },
  badgeText: {
    fontSize: 16,
    color: Color.whiteColor,
    fontWeight: 'bold'
  },
  card: {
    marginLeft: 10,
    height: 80,
    alignItems: 'center',
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    borderRadius: cardBorderRadius
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    color: Color.grayColor,
    fontSize: 20,
    lineHeight: 34
  },
  cardSubTitle: {
    fontSize: 14,
    color: Color.grayColor
  },
  viewDetailText: {
    fontSize: 16,
    color: Color.headerColor
  },
  viewDetailIcon: {
    fontSize: 24,
    color: Color.headerColor
  },
  btnResume: {
    backgroundColor: Color.headerColor,
    height: 48,
    width: 167,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: buttonBorderRadius
  },
  btnResumeText: {
    color: Color.whiteColor,
    fontSize: 16
  }
});

export default MilestoneCardComponentStyles;