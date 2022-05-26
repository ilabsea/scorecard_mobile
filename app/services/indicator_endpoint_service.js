import Indicator from '../models/Indicator';
import settingHelper from '../helpers/setting_helper';

const indicatorEndpointService = (() => {
  return {
    handleIndicatorEndpointUrlMigration,
  }

  async function handleIndicatorEndpointUrlMigration() {
    const endpointUrl = await settingHelper.getSavedEndpointUrl();
    const indicators = Indicator.getIndicatorsWithoutEndpointUrl();

    indicators.map(indicator => {
      setTimeout(() => {
        Indicator.update(indicator.uuid, { endpoint_url: endpointUrl });
      }, 50);
    });
  }
})();

export default indicatorEndpointService;