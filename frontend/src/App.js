import React from "react";
import { Routes, Route} from "react-router-dom";
import './App.css'
import HomePage from "./components/Pages/HomePage";
import Chatpage from "./components/Pages/ChatPage";
import LogIn from "./components/Authentication/Login";
import SignUp from "./components/Authentication/Signup";

const App = () => {
  return (
    <>

<Routes>
   <Route path="/" element={<HomePage/>}/>
   <Route path="/chats" element={<Chatpage/>}/>
    {/* HomePage Routes */}
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/signUp" element={<SignUp/>}/>

</Routes>

       </>
  );
};

export default App;
