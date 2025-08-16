import { StyleSheet } from 'react-native';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const mdTabletTitleWidth = 145;
const smTabletTitleWidth = 120;

const ProgressStepComponentStyles = StyleSheet.create({
  title: {
    paddingTop: 2,
    paddingHorizontal: 2,
    fontSize: 15,
    fontFamily: FontFamily.body,
    textAlign: 'center',
    color: Color.horizontalLineColor,
  },
});

export default ProgressStepComponentStyles;
export { mdTabletTitleWidth, smTabletTitleWidth };