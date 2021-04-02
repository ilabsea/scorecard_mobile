import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../../themes/color';
import { smLabelSize } from '../../../../constants/mobile_font_size_constant';
import { getDeviceStyle } from '../../../../utils/responsive_util';

const votingCriteriaListItemStyle = StyleSheet.create({
  ratingItemContainer: {
    marginBottom: 10,
    flexDirection: 'row'
  },
  ratingIconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -8,
  },
  ratingItem: {
    width: getDeviceStyle(50, wp('12%')),
    maxWidth: 57,
    paddingVertical: 2,
    flexDirection: 'row',
    marginRight: 6,
    backgroundColor: '#d8d8d8',
    borderRadius: 15,
    alignItems: 'center',
    paddingLeft: 6,
    marginTop: 4
  },
  ratingCount: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
  },
  resultWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('20%'),
    borderLeftWidth: 1,
    borderColor: Color.borderColor,
  },
  medianScoreText: {
    fontSize: wp('3%'),
  },
  medianText: {
    textAlign: 'center',
    fontSize: wp('3%'),
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
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderTopWidth: 1,
    width: '100%',
    borderTopColor: Color.borderColor,
    paddingTop: 4,
    alignItems: 'center',
    marginTop: 10,
    paddingRight: 10,
    marginBottom: -12
  },
  viewMoreLabel: {
    fontSize: wp(smLabelSize),
    color: Color.headerColor
  },
  viewMoreIcon: {
    fontSize: wp('4.5%'),
    color: Color.headerColor,
    marginTop: 1,
  },
  indicatorNameLabel: {
    paddingRight: 10,
    fontSize: wp('3.5%')
  },
});

export default votingCriteriaListItemStyle;