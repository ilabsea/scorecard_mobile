import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { mdLabelSize, smLabelSize, mdIconSize } from '../../constants/mobile_font_size_constant';
import { isShortScreenDevice } from '../../utils/responsive_util';

const mdMobileContainerSize = isShortScreenDevice() ? wp('18%') : wp('25%');
const smMobileContainerSize = wp('22%');

const mdMobileLabelSize = isShortScreenDevice() ? wp('2.4%') : wp(smLabelSize);
const smMobileLabelSize = wp('3.1%');

const mdMobileCheckIconSize = isShortScreenDevice() ? wp('4%') : wp(mdIconSize);
const smMobileCheckIconSize = wp('7%');

const mdMobileGenderIconSize = isShortScreenDevice() ? wp('5.4%') : wp('7.4%');
const smMobileGenderIconSize = wp('7.4%');
 
const mobileTitleLabelSize = isShortScreenDevice() ? wp(smLabelSize) : wp(mdLabelSize);

const mdMobileIconSize = isShortScreenDevice() ? wp('5%') : wp('7%');
const smMobileIconSize = 22;

export {
  mdMobileContainerSize,
  smMobileContainerSize,
  mdMobileLabelSize,
  smMobileLabelSize,
  mdMobileCheckIconSize,
  smMobileCheckIconSize,
  mdMobileGenderIconSize,
  smMobileGenderIconSize,
  mobileTitleLabelSize,
  mdMobileIconSize,
  smMobileIconSize,
};