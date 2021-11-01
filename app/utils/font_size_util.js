import { PixelRatio } from 'react-native';
import { HDPIRatio } from '../constants/screen_size_constant';

const mobileNormalLabelFontSize = PixelRatio.get() <= HDPIRatio ? 11 : 14;

export {
  mobileNormalLabelFontSize
}