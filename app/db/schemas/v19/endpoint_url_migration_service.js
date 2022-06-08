const endpointUrlMigrationService = (() => {
  return {
    updateEndpointUrlId,
  }

  function updateEndpointUrlId(oldRealm, newRealm) {
    const oldEndpointUrls = oldRealm.objects('EndpointUrl').sorted('order');
    const newEndpointUrls = newRealm.objects('EndpointUrl').sorted('order');

    oldEndpointUrls.map((oldEndpointUrl, index) => {
      newEndpointUrls[index].id = !oldEndpointUrl.id ? index + 1 : oldEndpointUrl.id;
    });
  }
})();

export default endpointUrlMigrationService;