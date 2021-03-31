import { StyleSheet } from 'react-native';
import Color from '../../../../themes/color';

const votingCriteriaListItemStyle = StyleSheet.create({
  ratingItemContainer: {
    height: 140,
    marginBottom: 20,
    flexDirection: 'row'
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
    marginTop: 6
  },
  ratingCount: {
    fontWeight: 'bold',
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
  },
  medianText: {
    textAlign: 'center',
    fontSize: 15,
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
    color: 'gray',
  },
  viewMoreContainer: {
    borderWidth: 0,
    position: 'absolute',
    right: 10,
    bottom: 4,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  viewMoreLabel: {
    fontSize: 15,
    color: Color.headerColor
  },
  viewMoreIcon: {
    fontSize: 24,
    color: Color.headerColor,
  },
  indicatorNameLabel: {
    paddingRight: 10
  }
});

export default votingCriteriaListItemStyle;