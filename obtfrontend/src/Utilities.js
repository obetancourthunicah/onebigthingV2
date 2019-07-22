// Configuración de Axios

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
export const setUnAuthHandler = (handler) => {
  privateAxios.interceptors.response.use(
    (response)=>{
      return response;
    },
    (error)=>{
      if(error.response){
        console.log(error.response.status);
        switch(error.response.status){
          case 401:
            handler(error.response.data);
            break;
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error);
      }
      return Promise.reject(error);
    }
  );
}

export const naxios = normalAxios;
export const paxios = privateAxios;


// Configuración de LocalStorage
const localStorageAvailable = (()=>{
  let t='t';
  try {
    localStorage.setItem(t,t);
    localStorage.removeItem(t);
    return true;
  } catch(e) {
    return false;
  }
})();
export const getLocalStorage =  (key)=>{
  if(!localStorageAvailable) { return null;}
  return  localStorage.getItem(key);
}
export const setLocalStorage =  (key, value)=>{
  if(!localStorageAvailable) { return false;}
   localStorage.setItem(key, value);
  return true
}
export const removeLocalStorage = async (key) => {
  if (!localStorageAvailable) { return false; }
   localStorage.removeItem(key);
  return true
}
