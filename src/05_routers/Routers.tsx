import {} from "react";
import { Route, Routes } from "react-router-dom";
import { All_Movies, Login, UserModal, Watchlist } from "@export";
import RouteProtector from "../02_components/02_route_protector/RouteProtector";
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<All_Movies />} />
      <Route
        path="/watchlist"
        element={<RouteProtector Component={Watchlist} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/all-movies/:movieId" element={<UserModal />} />
    </Routes>
  );
}

export default Routers;
