import { provinces } from '../constants/location_constant';

const locationHelper = (() => {
  return {
    getProvinceName,
  };

  function getProvinceName(value, appLanguage) {
    const results = provinces.filter(province => province.name_en == value.toLowerCase());

    if (results.length > 0)
      return appLanguage == 'km' ? results[0].name_km : results[0].name_en;

    return value;
  }
})();

export default locationHelper;
