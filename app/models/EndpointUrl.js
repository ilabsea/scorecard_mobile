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
    return realm.objects(MODEL).filtered(`label = $0`, label)[0];
  }

  function findByUrlValue(value) {
    return realm.objects(MODEL).filtered(`value = $0`, value)[0];
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, _buildData(data), 'modified');
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

   function _buildData(data) {
    const shortcutData = endpointUrlHelper.generateShortcutInfo(null, data.value);
    const lastId = realm.objects(MODEL).max('id');

    const params = {
      id: !lastId ? 1 : lastId + 1,
      uuid: uuidv4(),
      order: _getLastOrderNumber() + 1,
    };

    return {...data, ...params, ...shortcutData};
  }
})();

export default EndpointUrl;