import { StyleSheet, Dimensions } from 'react-native';
import Color from '../../themes/color';
import { cardBorderRadius } from '../../constants/border_radius_constant';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const windowWidth = Math.floor(Dimensions.get('window').width);
const itemWidth = windowWidth >= 550 ? (windowWidth - 60) / 2 : (windowWidth - 40);
const itemHeight = 100

const IndicatorCardComponentStyles = StyleSheet.create({
  indicatorBoxContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: cardBorderRadius,
    flexDirection: 'row',
    marginBottom: 17,
    marginHorizontal: 8,
    width: itemWidth,
    height: itemHeight,
    shadowColor: Color.blackColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    position: 'relative'
  },
  indicatorBox: {
    flexDirection: 'row',
    flex: 1,
  },
  detailContainer: {
    paddingLeft: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  raisedParticipantBadge: {
    position: 'absolute',
    top: -12,
    left: 10,
    backgroundColor: Color.whiteColor,
    borderColor: Color.grayColor,
    borderWidth: 1.4,
    paddingHorizontal: 4,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
    zIndex: 10
  },
  raisedParticipantLabel: {
    color: Color.clickableColor,
    fontSize: 12
  },
  raisedLabel: {
    fontFamily: FontFamily.title,
    fontSize: 14,
    color: Color.clickableColor,
  },
  indicatorLabel: {
    textAlign: 'left',
    fontSize: 15.7
  }
});

export default IndicatorCardComponentStyles;