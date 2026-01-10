import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Addpost from "./pages/admin/Addpost";
import Allpost from "./pages/admin/Allpost";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/protected/ProtectedRoute";
import PrivateRoute from "./routes/private/PrivateRoute";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ========================= PUBLIC ROUTES ========================= */}
          {/* Accessible without login */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="post/:id" element={<Post />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ========================= PRIVATE ROUTES ========================= */}
          {/* Accessible only if user is logged in */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<UserLayout />}>
              <Route path="profile/:id" element={<Profile />} />
            </Route>
          </Route>

          {/* ========================= PROTECTED / ADMIN ROUTES ========================= */}
          {/* Accessible only if user is logged in AND role === "admin" */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="addpost" element={<Addpost />} />
              <Route path="allposts" element={<Allpost />} />
            </Route>
          </Route>

          {/* ========================= 404 PAGE NOT FOUND ========================= */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
