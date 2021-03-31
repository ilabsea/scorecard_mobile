import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { FontFamily } from '../../../../assets/stylesheets/theme/font';
import { mdLabelSize, smLabelSize } from '../../../../constants/mobile_font_size_constant';

const FormModalStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 18,
    minHeight: 590,
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
    marginRight: 10
  },
  inputText: {
    fontSize: wp(smLabelSize),
    marginTop: 0,
    borderWidth: 0,
  },
  btnRemove: {
    marginLeft: 15
  },
  removeIcon: {
    color: 'red',
    fontSize: wp('5%'),
  }
});

export default FormModalStyles;