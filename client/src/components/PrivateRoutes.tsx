import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setAuthenticated, setUser } from "../store/authSlice";
import { RootState } from "../types";
const PrivateRoute = () => {
  const  navigate = useNavigate();
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
  const user = useSelector((state:RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
        try {
          const result = await axios.get(
            import.meta.env.VITE_SERVER_URL + "/api/auth/verify",{
              withCredentials:true
            }
            );
            console.log(result.data.message)
            const userId = await axios.get(
              import.meta.env.VITE_SERVER_URL + "/api/users/"+result.data.user,{
                withCredentials:true
              }
            )
            console.log(userId.data[0].id,user)
            if (result.data.message == "Token is valid") {
            dispatch(setAuthenticated(true)); 
            dispatch(setUser({username:result.data.user,user_id:userId.data[0].id}))
          } else {
            dispatch(setAuthenticated(false));
          }
        } catch (err) {
          console.error("Error verifying token:", err);
          dispatch(setAuthenticated(false));
        }
        finally {
          setLoading(false);
        }  
    };
    checkAuth();
  }, []);

  useEffect(()=>{
    console.log(isAuthenticated)
    navigate('/');
  },[])
  
  if (loading) {
    return <div>Loading...</div>;
  }
  return <Outlet /> ;
};

export default PrivateRoute;
