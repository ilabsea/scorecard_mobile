
const endpointFormHelper = (() => {
  return {
    hasDiscardAlert
  }

  function hasDiscardAlert(inputLabel, inputUrl, selectedEndpoint) {
    if (!inputLabel && !inputUrl)
      return false;
  
    return !!selectedEndpoint && (selectedEndpoint.label == inputLabel && selectedEndpoint.value == inputUrl) ? false : true;
  }
})();

export default endpointFormHelper;