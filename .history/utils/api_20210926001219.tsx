import axios from 'axios';

export default async function api(path: string) {
  return axios.get(path).then(response);
}
