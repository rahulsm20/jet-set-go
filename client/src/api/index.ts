import axios from "axios";
import { FieldValues } from "react-hook-form";

const api = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL + "/api",withCredentials:true });

export const fetchPopularDestinations = () => api.get(`/popular_destinations`)
export const login = async (data: FieldValues) => {
    const response = await api.post(`/auth/login`,data)
    return response; 
};
export const getPosts = () => api.get(`/posts`);
export const logout = ()=>api.post(`/auth/logout`);
export const signup = (data:FieldValues)=>api.post(`/auth/signup`,data)
