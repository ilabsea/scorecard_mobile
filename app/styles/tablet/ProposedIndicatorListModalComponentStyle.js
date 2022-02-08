import { StyleSheet } from 'react-native';
import { modalBorderRadius } from '../../constants/border_radius_constant';
import { popupModalMinHeight } from '../../constants/component_style_constant';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const ProposedIndicatorListModalComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    padding: 20,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
    width: '80%',
    maxHeight: 650,
    minHeight: popupModalMinHeight,
    alignSelf: 'center',
    borderRadius: modalBorderRadius
  },
  header: {
    fontFamily: FontFamily.title,
    textTransform: 'capitalize',
    fontSize: 24,
  },
  label: {
    fontSize: 16,
  },
  btnWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

export default ProposedIndicatorListModalComponentStyles;