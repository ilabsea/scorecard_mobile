const audioUtil = (() => {
  return {
    getFormattedPlaySeconds,
    // getReverseSeconds,
  }

  function getFormattedPlaySeconds(seconds = 0) {
    return new Date(Math.round(seconds) * 1000).toISOString().substr(14, 5);
  }

  // function getReverseSeconds(playSeconds = 0, duration = 0) {
  //   if (playSeconds || duration) {
  //     const reverseSecond = duration - playSeconds;
  //     return getFormattedPlaySeconds(reverseSecond);
  //   }
  //   return '00:00';
  // }
})();

export default audioUtil;