import User from '../models/User';
import cryptoUtil from '../utils/crypto_util';

const userService = (() => {
  return {
    saveSignedInUser,
    getSignedInUser
  }

  function saveSignedInUser(email, password) {
    User.upsert({
      email: cryptoUtil.encrypt(email),
      password: cryptoUtil.encrypt(password)
    });
  }

  function getSignedInUser() {
    const user = User.get();
    if (!user) return null;

    return {
      email: cryptoUtil.decrypt(user.email),
      password: cryptoUtil.decrypt(user.password)
    }
  }
})();

export default userService;