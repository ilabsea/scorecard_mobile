import {StyleSheet} from 'react-native';
import { FontFamily } from '../assets/stylesheets/theme/font';

const CustomStyle = StyleSheet.create({
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    marginBottom: 6,
    backgroundColor: 'white',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  bottomButton: {
    elevation: 0,
    height: 50,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: FontFamily.title,
    marginBottom: 20,
  },
  modalBtnWrapper: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

export default CustomStyle;
