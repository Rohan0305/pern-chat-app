import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  const [num, setNum] = React.useState<number>(0);

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </div>
    </>
  );
}

export default App;
