import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  NotFound,
  Subscription,
  Account,
  GetAllUsers,
  ChangePassword,
  Unauthorized,
  Test,
  MoviePage,
} from "./pages";

import Layout from "./layout/Layout";
import PaginatedItems from "./components/search-pagination/Pagination";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PersistLogin from "./components/persistance/PersistLogin";
import GetMovies from "./components/getMovies/getMovies";
// import MovieProvider from "./utils/MovieProvider";
// import AuthProvider from "./utils/AuthProvider";

const ROLES = {
  user: ["tier1", "tier2", "tier3", "tier4"],
  admin: ["admin"],
};

const App = () => {
  return (
    <div className="app w-full h-screen mx-auto">
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* <Route path="/test" element={<Test />} /> */}

      {/* Private Routes */}
      {/* Persist User to pages */}
      <Route element={<PersistLogin />}>
        {/* User routes */}
        <Route element={<ProtectedRoutes allowedRoles={ROLES.user+ROLES.admin} />}>
          <Route path="/" element={<Layout />}>
            <Route element={<GetMovies />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/play/:id" element={<Test />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/search/" element={<PaginatedItems />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/me" element={<Account />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoutes allowedRoles={ROLES.admin} />}>
          <Route path="/get-users" element={<GetAllUsers />} />
        </Route>
      </Route>

      {/* catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  );
};

export default App;
