import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;
