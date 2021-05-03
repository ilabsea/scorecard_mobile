import { StyleSheet } from 'react-native';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

const FormModalComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    padding: 20,
    minHeight: 590,
    marginHorizontal: 30,
    justifyContent: 'flex-start'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  titleContainer: {
    flex: 1,
    paddingRight: 35,
  },
  titleText: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 10
  },
  subTitleText: {
    fontSize: 16
  },
  orderNumberText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20
  },
  inputText: {
    fontSize: 16,
    marginTop: 0,
    borderWidth: 0
  },
  btnRemove: {
    marginLeft: 20
  },
  removeIcon: {
    color: Color.redColor,
    fontSize: 22,
  }
});

export default FormModalComponentStyles;