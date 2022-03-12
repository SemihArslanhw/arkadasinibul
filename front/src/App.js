import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Homepage from './pages/Homepage';
import Header from "./components/StartingHeader/Header"
import ConversationPage from './pages/ConversationPage';
import { useContext } from 'react';
import { AuthContext } from "./context/AuthContext";

function App() {
   
  const {user} = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
         <Route path="/" element={<Homepage/>} /> 
         <Route path="/sohbet" element={<ConversationPage/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
