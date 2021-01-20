import Color from '../themes/color';
import { StyleSheet } from 'react-native';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';

const modalStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    minHeight: "50%",
    marginHorizontal: 30,
    justifyContent: 'flex-start',
  },
  btnActionWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.title,
    marginBottom: 16
  },
  devider: {
    width: '100%',
    borderTopWidth: 2,
    borderColor: '#ccc',
    marginVertical: 20
  }
});


export default modalStyle;
