import realm from '../db/schema';

const MODEL = 'User';

const Contact =  (() => {
  return {
    get,
    upsert,
  }

  function get() {
    return realm.objects(MODEL)[0];
  }

  function upsert(data) {
    const user = get();
    if (!user) {
      realm.write(() => { realm.create(MODEL, { id: 1, ...data }, 'modified') });
      return;
    }

    realm.write(() => { realm.create(MODEL, Object.assign(data, {id: user.id}), 'modified') })
  }
})();

export default Contact;