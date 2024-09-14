import axios from 'axios';
import { useEffect } from 'react';
import { getCookie } from '../utils/getCookie';
import { useUserContext } from '../../../context/UserContext';
// import { useUserContext } from '../../../context/UserContext';
import { storageService } from '../../../services/StorageService';

const useAxiosInstance =   () =>  {
  const { cookie } = useUserContext();
  var token = cookie?cookie:storageService.getTokenDirectly(storageService.token);

  const instance =token? axios.create({
    // baseURL: 'http://localhost:8079/lifepill/v1',
    //baseURL: 'http://18.188.108.84:8079/lifepill/v1',
    baseURL: 'http://134.209.210.1/api/method/',
    headers: {
      'Content-type': 'application/json',
       Authorization: `Bearer ${token}`,
    },
  }):axios.create({
    baseURL: 'http://134.209.210.1/api/method/',
    headers: {
      'Content-type': 'application/json',
    },
  });


  console.log(cookie);
  useEffect(() => {
    // Update instance headers when cookie changes
    if (cookie)
      instance.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
    console.log(`Bearer ${cookie}`);
  }, [cookie, instance]);

  useEffect(() => {
    // const cookieString = document.cookie;
    // const cookies = cookieString.split(';').reduce((acc: any, cookie) => {
    //   const [name, value] = cookie.trim().split('=');
    //   acc[name] = value;
    //   return acc;
    // }, {});

    // const token = cookies.Authorization;
    // console.log(token);
    // if (token) {
    //   console.log('Setting token:', token);
    //   instance.defaults.headers.common['Authorization'] = `Bearer ${getCookie('Authorization')}`;
    // }

    instance.interceptors.response.use(
      (response) => {
        // Handle successful responses
        return response;
      },
      (error) => {
        // Handle error responses
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log('Response error status:', error.response.status);
          console.log('Response error data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Request error:', error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log('Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }, [instance]);

  return instance;
};

export default useAxiosInstance;
