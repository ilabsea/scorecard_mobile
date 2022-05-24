import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4'
import { CUSTOM, DEFAULT } from '../constants/main_constant';
import endpointUrlHelper from '../helpers/endpoint_url_helper';

const MODEL = 'EndpointUrl';

const EndpointUrl = (() => {
  return {
    getAll,
    getAllCustomEndpointUrls,
    findByUuid,
    findByLabel,
    findByUrlValue,
    findByUrlAndUsername,
    create,
    update,
    isExist,
    destroy,
  }

  function getAll() {
    const defaultEndpointUrls = realm.objects(MODEL).filtered(`type = '${DEFAULT}' SORT(order ASC)`);
    const customEndpointUrls = realm.objects(MODEL).filtered(`type = '${CUSTOM}' SORT(order ASC)`);
    return [...defaultEndpointUrls, ...customEndpointUrls];
  }

  function getAllCustomEndpointUrls() {
    return realm.objects(MODEL).filtered(`type = '${CUSTOM}'`);
  }

  function findByUuid(uuid) {
    return realm.objects(MODEL).filtered(`uuid = '${uuid}'`)[0];
  }

  function findByLabel(label) {
    return realm.objects(MODEL).filtered(`label = '${label}'`)[0];
  }

  function findByUrlValue(value) {
    return realm.objects(MODEL).filtered(`value = '${value}'`)[0];
  }

  function findByUrlAndUsername(url, username) {
    return realm.objects(MODEL).filtered(`value = '${url}' AND username = '${username}'`)[0];
  }

  function create(data) {
    realm.write(async () => {
      realm.create(MODEL, await _buildData(data), 'modified');
    });
  }

  function update(uuid, params) {
    realm.write(() => {
      realm.create(MODEL, Object.assign(params, { uuid: uuid }), 'modified');
    });
  }

  function isExist(label, value) {
    return !!findByLabel(label) || !!findByUrlValue(value)
  }

  function destroy(uuid) {
    const endpointUrl = findByUuid(uuid);
    if (!!endpointUrl) {
      realm.write(() => {
        realm.delete(endpointUrl);
      });
    }
  }

  // private method
  function _getLastOrderNumber() {
    const orderNumber = realm.objects(MODEL).max('order');
    return !orderNumber ? 0 : orderNumber;
  }

  async function _buildData(data) {
    const shortcutData = endpointUrlHelper.generateShortcutData(data.value);
    const accountInfo = await endpointUrlHelper.getEndpointAccountInfo(data.value);

    const params = {
      uuid: uuidv4(),
      order: _getLastOrderNumber() + 1,
    };

    return {...data, ...params.order, ...shortcutData, ...accountInfo};
  }
})();

export default EndpointUrl;