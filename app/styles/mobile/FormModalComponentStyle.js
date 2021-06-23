import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { mdLabelSize, smLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';

const FormModalComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    padding: 18,
    minHeight: 530,
    marginHorizontal: 20,
    justifyContent: 'flex-start'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 15,
  },
  titleText: {
    fontSize: wp(mdLabelSize),
    fontFamily: FontFamily.title,
    marginBottom: 10,
  },
  subTitleText: {
    fontSize: wp(smLabelSize)
  },
  orderNumberText: {
    fontSize: wp(mdLabelSize),
    fontWeight: 'bold',
    marginRight: 10,
  },
  inputText: {
    fontSize: wp(smLabelSize),
    borderWidth: 0,
    height: 30,
    marginVertical: 10,
    paddingHorizontal: 0
  },
  btnRemove: {
    marginLeft: 15,
    marginTop: 0
  },
  removeIcon: {
    color: Color.redColor,
    fontSize: wp('5%'),
  }
});

export default FormModalComponentStyles;