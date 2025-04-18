import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const {authUser, setAuthUser, isLoading} = useAuthContext();

  if (isLoading) {
    return null;
  }
  
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"}/>}/>
        <Route path="/signup" element={!authUser ? <SignUp/> : <Navigate to={"/signup"}/>}/>
        <Route path="/login" element={!authUser ? <Login/> : <Navigate to={"/login"}/> }/>
      </Routes>
      </div>
    </>
  );
}

export default App;
