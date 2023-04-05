import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Color from '../../themes/color';

const ProposedNewIndicatorResultListComponentStyles = StyleSheet.create({
  listContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 10,
    maxHeight: hp('65%'),
  },
  scrollView: {
    paddingBottom: 30,
    paddingTop: 0,
    paddingHorizontal: 16
  },
  backDrop: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    height: hp('100%'),
    width: wp('100%'),
    zIndex: -1
  },
  createIndicatorBtn: {
    borderWidth: 2,
    borderRadius: 8,
    height: 72,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  createIndicatorBtnIcon: {
    fontSize: 38
  },
  createIndicatorBtnLabel: {
    fontSize: 18,
    marginTop: 6,
    textAlign: 'center',
  }
})

export default ProposedNewIndicatorResultListComponentStyles