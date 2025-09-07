// import axios from 'axios';


// export const axiosBase = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const axiosJWT = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
// axiosJWT.interceptors.request.use(
//   async (config) => {
//     try {
//       const accessToken = await getValidAccessTokenHelper();
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//       return config;
//     } catch (error) {
//       clearAuthStorage();
//       store.dispatch(resetUser());
//       window.location.replace('/login');
//       return Promise.reject(error);
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
