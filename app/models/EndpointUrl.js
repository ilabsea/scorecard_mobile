import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4'

const MODEL = 'EndpointUrl';

const EndpointUrl = (() => {
  return {
    getAll,
    findByUuid,
    findByLabel,
    findByUrlValue,
    create,
    update,
    isExist,
    destroy,
  }

  function getAll() {
    return realm.objects(MODEL).sorted('order', false);
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

  function create(data) {
    let params = data;
    params['uuid'] = uuidv4();
    params['order'] = _getLastOrderNumber() + 1;

    realm.write(() => {
      realm.create(MODEL, params, 'modified');
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
})();

export default EndpointUrl;