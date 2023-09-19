import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoutes";
import SignupForm from "./components/SignupForm";
import Flights from "./pages/Flights";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import Restaurants from "./pages/Restaurants";
import RedirectRoutes from "./components/RedirectRoutes";
import PopularDestination from "./pages/PopularDestination";
function App() {
  return (
    <Routes>
      <Route element={<RedirectRoutes/>}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupForm />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/destinations/:destinationId" element={<PopularDestination/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/restaurants" element={<Restaurants />} />
        {/* <Route path="/profile" element={<Social/>}/> */}
      </Route>
      <Route path="*" element={<Navigate to='/'/>}></Route>
    </Routes>
  );
}

export default App;
