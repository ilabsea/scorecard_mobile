import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const ScorecardItemComponentStyles = StyleSheet.create({
  itemContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Color.whiteColor,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.paleGrayColor,
    marginTop: 0.3
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    marginTop: -5,
  },
  subTitle: {
    fontFamily: FontFamily.title,
    marginBottom: 8,
    flex: 1
  },
  viewDetailContainer: {
    height: 48
  },
  viewDetailLabel: {
    fontSize: 16
  },
  viewDetailIcon: {
    fontSize: 24
  },
  statusIcon: {
    fontSize: 50,
    color: Color.whiteColor
  },
  lockIcon: {
    fontSize: 28,
  },
  deleteContainer: {
    backgroundColor: Color.redColor,
    maxHeight: 157,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    height: 79,
  },
  deleteLabel: {
    fontSize: bodyFontSize()
  },
  locationLabel: {
    fontSize: 14,
    marginLeft: 4,
    color: Color.grayColor,
    marginRight: 0,
    marginLeft: 0,
    fontFamily: FontFamily.body,
  },
  iconBorder: {
    borderWidth: 1.2,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30, 
  },
  removeDateIcon: {
    marginTop: 3,
    marginRight: 4
  },
  removeDateLabel: {
    fontSize: 13,
    color: Color.redColor,
    fontFamily: FontFamily.body,
    textAlign: 'right',
  }
});

export default ScorecardItemComponentStyles;