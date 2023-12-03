import CryptoJS from "crypto-js";
import { environment } from '../config/environment';

const cryptoUtil = (() => {
  return {
    encrypt,
    decrypt,
  }

  function encrypt(text) {
    return CryptoJS.AES.encrypt(text, environment.encryptionKey).toString();
  }

  function decrypt(encryptedText) {
    return CryptoJS.AES.decrypt(encryptedText, environment.encryptionKey).toString(CryptoJS.enc.Utf8);
  }
})();

export default cryptoUtil;