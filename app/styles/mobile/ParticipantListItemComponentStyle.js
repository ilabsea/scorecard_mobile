import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { lgLabelSize, smLabelSize, mdIconSize, mdLabelSize } from '../../constants/mobile_font_size_constant';
import Color from '../../themes/color';
import { numberContainerSize } from '../../utils/participant_list_util';

const PrarticipantListItemComponentStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 20,
    paddingBottom: 0,
    borderWidth: 0
  },
  orderNumberColumn: {
    width: wp('11.7%'),
    marginTop: 4,
  },
  itemColumn: {
    flex: 1,
    height: 60,
    width: wp('10.5%'),
    alignItems: 'center',
    padding: 0,
  },
  itemValueContainer: {
    paddingTop: 10,
  },
  numberContainer: {
    width: numberContainerSize,
    height: numberContainerSize,
    marginTop: 4,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.grayColor,
  },
  numberLabel: {
    fontSize: wp(lgLabelSize),
    color: Color.whiteColor,
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
  emptyLabel: {
    fontSize: 18,
    textAlign: 'center',
  },
  iconStyle: {
    fontSize: wp(mdIconSize),
  },
  ageLabel: {
    fontSize: wp(mdLabelSize),
    marginTop: -2
  },
  editLabel: {
    color: Color.primaryButtonColor,
    fontSize: wp(smLabelSize),
  },
  actionColumn: {
    width: 50,
  }
});

export default PrarticipantListItemComponentStyles;