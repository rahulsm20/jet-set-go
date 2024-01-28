import axios from "axios";
import { FieldValues } from "react-hook-form";
// const dispatch
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + "/api/",
  withCredentials: true,
});

export const fetchPopularDestinations = () => api.get(`/popular_destinations`);
export const login = async (data: FieldValues) => {
  const response = await api.post(`auth/login`, data);
  return response;
};
export const getPosts = () => api.get(`posts`);
export const logout = () => api.post(`auth/logout`);
export const signup = (data: FieldValues) => api.post(`auth/signup`, data);
export const verify = () => api.post(`auth/verify`);
export const getUserDetails = (username: string) =>
  api.get(`users/${username}`);
export const getLocation = (city: string) => api.get(`location/${city}`);
export const getRestaurants = (locationId: string) =>
  api.get(`restaurants/${locationId}`);
// export const checkAuth = async()=>{
//     const result = await api.get(`auth/verify`)
//     const userId = await axios.get(`users/${result.data.user}`)
//     return {result, userId}
//         //           import.meta.env.VITE_SERVER_URL + "/api/users/"+result.data.user,{
//         //             withCredentials:true
//         //           }
//         //         )
// }

// export const checkAuth = async () => {
//     try {
//         const result = await axios.get(
//           import.meta.env.VITE_SERVER_URL + "/api/auth/verify",{
//             withCredentials:true
//           }
//           );
//           console.log(result.data.message)
//           const userId = await axios.get(
//             import.meta.env.VITE_SERVER_URL + "/api/users/"+result.data.user,{
//               withCredentials:true
//             }
//           )
//         //   console.log(userId.data[0].id,user)
//           if (result.data.message == "Token is valid") {
//           dispatch(setAuthenticated(true));
//           dispatch(setUser({username:result.data.user,user_id:userId.data[0].id}))
//         } else {
//           dispatch(setAuthenticated(false));
//         }
//       } catch (err) {
//         console.error("Error verifying token:", err);
//         dispatch(setAuthenticated(false));
//       }
//       finally {
//         setLoading(false);
//       }
//   };

// const checkAuth = async () => {
//     try {
//       const result = await axios.get(
//         import.meta.env.VITE_SERVER_URL + "/api/auth/verify",{
//           withCredentials:true
//         }
//         );
//         console.log(result.data.message)
//         const userId = await axios.get(
//           import.meta.env.VITE_SERVER_URL + "/api/users/"+result.data.user,{
//             withCredentials:true
//           }
//         )
//         console.log(userId.data[0].id,user)
//         if (result.data.message == "Token is valid") {
//         dispatch(setAuthenticated(true));
//         dispatch(setUser({username:result.data.user,user_id:userId.data[0].id}))
//       } else {
//         dispatch(setAuthenticated(false));
//       }
//     } catch (err) {
//       console.error("Error verifying token:", err);
//       dispatch(setAuthenticated(false));
//     }
//     finally {
//       setLoading(false);
//     }
// };
