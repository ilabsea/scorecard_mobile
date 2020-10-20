import { environment } from '../config/environment';

export default {
  download(code) {
    return fetch(`${environment.apiUrl}/languages/${code}/download`);
  }
}
