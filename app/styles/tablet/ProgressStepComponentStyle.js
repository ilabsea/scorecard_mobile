import { StyleSheet } from 'react-native';
import Color from '../../themes/color';

const mdTabletTitleWidth = 145;
const smTabletTitleWidth = 120;

const ProgressStepComponentStyles = StyleSheet.create({
  title: {
    paddingTop: 2,
    paddingHorizontal: 2,
    fontSize: 15,
    textAlign: 'center',
    color: Color.horizontalLineColor,
  },
});

export default ProgressStepComponentStyles;
export { mdTabletTitleWidth, smTabletTitleWidth };