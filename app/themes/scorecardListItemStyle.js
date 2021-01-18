import Color from '../themes/color';
import {StyleSheet} from 'react-native';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';

const ListItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.title,
    color: '#3a3a3a',
    marginBottom: 6,
  },
  subTextWrapper: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center'
  },
  subText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: FontFamily.body,
  },
  subTextIcon: {
    fontSize: 24,
    color: Color.subText
  },
  contentWrapper: {
    paddingLeft: 20,
    paddingTop: 10,
    flex: 1
  },
  statusIconWrapper: {
    width: '25%',
    maxWidth: 160,
    backgroundColor: '#787878',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    maxHeight: 160,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 4,
    flexDirection: 'row',
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  viewDetail: {
    height: 48,
    borderTopWidth: 1,
    borderTopColor: Color.borderColor,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default ListItemStyle;
