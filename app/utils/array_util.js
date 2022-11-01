const arrayUtil = (() => {
  return {
    getTotalOf
  }

  function getTotalOf(array, fieldname, value) {
    return array.reduce((previousValue, currentValue) => {
      return currentValue[fieldname] === value ? ++previousValue : previousValue;
    }, 0)
  }
})();

export default arrayUtil;