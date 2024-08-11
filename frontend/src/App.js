import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Homepage from './views/Homepage'
import Registerpage from './views/Registerpage'
import Loginpage from './views/Loginpage'
import Dashboard from './views/Dashboard'
import Navbar from './views/Navbar'
import PrivateRoute from "./utils/PrivateRoute";




function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* <Route element={<PrivateRoute element={Dashboard}/>} path='/dashboard' exact /> */}
          <Route element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>} path="/dashboard" />
          <Route Component={Loginpage} path="/login" exact />
          <Route Component={Registerpage} path="/register" exact />
          <Route Component={Homepage} path="/" exact />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
