import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { cardBorderRadius } from '../../constants/border_radius_constant';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const votingIndicatorListItemComponentStyle = StyleSheet.create({
  ratingItemContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    borderRadius: cardBorderRadius
  },
  ratingIconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ratingItem: {
    width: '25%',
    maxWidth: 57,
    paddingVertical: 2,
    flexDirection: 'row',
    marginRight: 6,
    backgroundColor: '#d8d8d8',
    borderRadius: 15,
    alignItems: 'center',
    paddingLeft: 6,
    marginTop: 6,
  },
  ratingCount: {
    fontWeight: 'bold',
    fontFamily: FontFamily.body,
    flex: 1,
    textAlign: 'center'
  },
  resultWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    borderLeftWidth: 1,
    borderColor: Color.borderColor,
  },
  medianScoreText: {
    fontSize: 14,
    fontFamily: FontFamily.body,
  },
  medianText: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FontFamily.body,
    marginTop: 4,
    color: '#0404d0',
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  avatarContainer: {
    backgroundColor: Color.cardListItemAvataBg,
    width: '17%',
  },
  summaryInfoLabel: {
    fontSize: 13,
    fontFamily: FontFamily.body,
    color: Color.grayColor,
  },
  viewMoreContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingTop: 10
  },
  borderedViewMoreContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderTopWidth: 1,
    width: '100%',
    borderTopColor: Color.borderColor,
    paddingTop: 6,
    alignItems: 'center',
    marginTop: 10,
    paddingRight: 10,
    marginBottom: -10
  },
  viewMoreLabel: {
    fontSize: 15,
    fontFamily: FontFamily.body,
    color: Color.headerColor,
  },
  viewMoreIcon: {
    fontSize: 24,
    color: Color.headerColor,
  },
  indicatorNameLabel: {
    paddingRight: 10,
    fontFamily: FontFamily.body,
  }
});

export default votingIndicatorListItemComponentStyle;