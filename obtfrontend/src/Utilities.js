import axios from 'axios';

let normalAxios = axios.create();
normalAxios.defaults.headers.common['cache-control'] = 'no-cache';
normalAxios.defaults.headers.post['Content-Type'] = 'no-cache';
normalAxios.defaults.headers.put['Content-Type'] = 'no-cache';

let privateAxios = axios.create();
privateAxios.defaults.headers.common['cache-control'] = 'no-cache';
privateAxios.defaults.headers.post['Content-Type'] = 'no-cache';
privateAxios.defaults.headers.put['Content-Type'] = 'no-cache';

export const setJWT = (jwt) => {
  privateAxios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export const naxios = normalAxios;
export const paxios = privateAxios;
