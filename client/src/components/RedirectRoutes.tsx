import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../types";
const PrivateRoute = () => {
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  return isAuthenticated ? <Navigate to="/"/> : <Outlet />  ;
};

export default PrivateRoute;
