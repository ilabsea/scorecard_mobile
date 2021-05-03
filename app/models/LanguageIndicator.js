import realm from '../db/schema';

const LanguageIndicator = (() => {
  return {
    create,
  };

  function create(data) {
    realm.write(() => {
      realm.create('LanguageIndicator', data, 'modified');
    });
  }
})();

export default LanguageIndicator;