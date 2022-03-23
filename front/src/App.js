import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Homepage from './pages/Homepage';
import Header from "./components/StartingHeader/Header"
import ConversationPage from './pages/ConversationPage';
import { useContext } from 'react';
import { AuthContext } from "./context/AuthContext";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile';

function App() {
   
  const {user} = useContext(AuthContext);

  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Header/>
        <Routes>
         <Route path="/" element={user ? <Homepage/> : <Navigate to="/giris"/>} /> 
         <Route path="/sohbet" element={user ? <ConversationPage/> :  <Navigate to="/giris"/>}/> 
         <Route path="/profil" element={user ? <Profile/> :  <Navigate to="/giris"/>}/> 
         <Route path="/profil/:profileId" element={user ? <Profile/> :  <Navigate to="/giris"/>}/> 
         <Route path="/sohbet/:convId" element={user ? <ConversationPage/> :  <Navigate to="/giris"/>}/> 
         <Route path="/giris" element={user ?<Navigate to="/"/> : <LoginPage/>}/>
         <Route path="/kayitol" element={user ? <Homepage/> : <RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
