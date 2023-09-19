import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../types";
import LogoutModal from "./LogoutModal";
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
const Navbar = () => {
  const dispatch =useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state:RootState)=>state.auth.user)

  const navigate = useNavigate();

  const handleLogout = async():Promise<void>=>{
    const authToken = Cookies.get("authToken");
    const config = {
      headers:{
        Authorization: "Token "+ authToken,
      },
    }
    console.log(config)
    try{
      const result = await axios.post(import.meta.env.VITE_SERVER_URL+"/api/auth/logout","",config)
      console.log(result)
      dispatch(setUser({username:user.username,user_id:user.user_id}))
      navigate("/login")
    }
    catch(err){
      console.log("Error logging out: "+err)
    }
  }

  return (
    <div className="top-0 nav p-5 sticky flex justify-between items-center border-b border-gray-600 z-10">
      <div className="flex gap-2 bg- rounded-2xl p-2">
        <img src="/plane_icon_white.png" className="w-8" />
      </div>
      <ul className="flex gap-2">
        <li className="hover:underline">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link to="/flights">Flights</Link>
        </li>
        <li className="hover:underline">
          <Link to="/hotels">Hotels</Link>
        </li>
        <li className="hover:underline">  
          <Link to="/restaurants">Restaurants</Link>
        </li>
      </ul>
      {
        isAuthenticated ? 
        <div className="gap-4 items-center flex flex-col md:flex-row">
          {user.username}
            <LogoutModal handleLogout={handleLogout}/>
        </div>
        :
          <div className="hover:underline">
            <Link to="/login">
              <button className="btn btn-transparent hover:bg-white bg-slate-200 normal-case text-black btn-sm text-sm">
                Login
                <img src="/arrow-right.svg" className="w-5" />
              </button>
            </Link>
          </div>
      }
    </div>
  );
};

export default Navbar;
