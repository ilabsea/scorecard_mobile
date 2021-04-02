import { StyleSheet } from 'react-native';
import Color from '../../../../themes/color';

export const badgeSize = 40;

const MilestoneCardStyles = StyleSheet.create({
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
    color: '#fff',
  },
  badgeText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  card: {
    marginLeft: 10,
    height: 80,
    alignItems: 'center',
    flex: 1,
    padding: 20,
    flexDirection: 'row'
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#808080',
    fontSize: 20,
    lineHeight: 34
  },
  cardSubTitle: {
    fontSize: 14,
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
    alignItems: 'center'
  },
  btnResumeText: {
    color: '#fff',
    fontSize: 16
  }
});

export default MilestoneCardStyles;