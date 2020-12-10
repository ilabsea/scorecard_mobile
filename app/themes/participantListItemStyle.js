import Color from '../themes/color';
import { StyleSheet } from 'react-native';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';

const participantListItemStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: 450,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20,
    textTransform: 'capitalize',
    flex: 1,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  numberLabel: {
    fontWeight: '700',
    fontSize: 18,
    color: 'white',
    margin: 0,
    marginTop: -4,
    padding: 0,
    textAlign: 'center',
  },
  button: {
    paddingLeft: 15,
    paddingRight: 20,
    alignSelf: 'center',
  },
  buttonLabel: {
    color: Color.primaryButtonColor,
  },
  participantItem: {
    flexDirection: 'row',
    borderWidth: 0,
    paddingVertical: 16,
    alignItems: 'center',
  },
});

export default participantListItemStyle;
