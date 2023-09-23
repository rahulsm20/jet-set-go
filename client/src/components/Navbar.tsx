import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api";
import { setAuthenticated } from "../store/authSlice";
import { RootState } from "../types";
import LogoutModal from "./LogoutModal";
const Navbar = () => {
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state:RootState)=>state.auth.user)
  

  const handleLogout = async()=>{
    try{
      const result = await logout();
      console.log(result)
      dispatch(setAuthenticated(false));
      navigate("/")
    }
    catch(err){
      console.log("Error logging out: "+err)
    }
  }

  return (
    <div className="top-0 nav p-5 sticky flex flex-col md:flex-row gap-5 justify-between items-center border-b border-gray-600 z-10">
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
