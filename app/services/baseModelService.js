import realm from '../db/schema';

class BaseModelService {
  delete(uuid, modelClass) {
    let model = undefined;

    if (modelClass == 'Scorecard')
      model = realm.objects(modelClass).filtered(`uuid == '${uuid}'`);
    else
      model = realm.objects(modelClass).filtered(`scorecard_uuid == '${uuid}'`);

    realm.write(() => {
      realm.delete(model);
    });
  }
}

export default BaseModelService;