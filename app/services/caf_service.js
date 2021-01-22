import realm from '../db/schema';
import CafApi from '../api/CafApi';
import { handleApiResponse } from './api_service';

const save = async (localNgoId, callback) => {
  const cafApi = new CafApi();
  const response = await cafApi.load(localNgoId);
  handleApiResponse(response, (cafs) => {
    let savedCount = 0;
    cafs.map((caf) => {
      const cafSet = {
        id: caf.id,
        name: caf.name,
        local_ngo_id: caf['local_ngo_id'],
      };
      realm.write(() => {
        realm.create('Caf', cafSet, 'modified');
        savedCount += 1;
      });
    });

    callback(savedCount === cafs.length);
  }, (error) => {
    console.log('error download caf = ', error);
  });
};

export { save };