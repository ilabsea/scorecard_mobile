import { provinces } from '../constants/location_constant';

const locationHelper = (() => {
  return {
    getProvinceName,
    getSortedLocation,
  };

  function getProvinceName(value, appLanguage) {
    const results = provinces.filter(province => province.name_en == value.toLowerCase());

    if (results.length > 0)
      return appLanguage == 'km' ? results[0].name_km : results[0].name_en;

    return value;
  }

  // Sort location by selected status and by location name (alphabetical order A-Z)
  function getSortedLocation(locations, appLanguage) {
    if (!_hasSelectedLocation(locations))
      return locations.sort((a, b) => getProvinceName(a.label, appLanguage) > getProvinceName(b.label, appLanguage));

    return locations.sort((a, b) => (a.isSelected == b.isSelected) ? 0 : b.isSelected ? 1 : -1);
  }

// Private method
  function _hasSelectedLocation(locations) {
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].isSelected)
        return true;
    }

    return false;
  }
})();

export default locationHelper;
