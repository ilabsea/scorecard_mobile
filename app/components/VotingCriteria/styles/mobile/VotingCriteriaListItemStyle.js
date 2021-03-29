import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Color from '../../../../themes/color';
import { mdLabelSize, smLabelSize, mdIconSize } from '../../../../constants/mobile_font_size_constant';
import { getDeviceStyle } from '../../../../utils/responsive_util';

const votingCriteriaListItemStyle = StyleSheet.create({
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
    marginTop: 6
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
    width: wp('24%'),
    borderLeftWidth: 1,
    borderColor: Color.borderColor,
  },
  medianScoreText: {
    fontSize: wp(smLabelSize),
  },
  medianText: {
    textAlign: 'center',
    fontSize: wp(smLabelSize),
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
  viewMoreLabel: {
    fontSize: wp(mdLabelSize),
    color: Color.headerColor
  },
  viewMoreIcon: {
    fontSize: wp(mdIconSize),
    color: Color.headerColor,
    marginTop: 1,
  },
});

export default votingCriteriaListItemStyle;