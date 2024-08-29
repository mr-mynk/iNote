import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NoteState from './context/notes/noteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (type, msg) => {
    setAlert({
      type:type,
      msg:msg
    });
    setTimeout(() => {
      setAlert(null);
    },2000)
  };
  return (
    <>
    <NoteState showAlert={showAlert}>
    <BrowserRouter>
      <Navbar showAlert={showAlert}/>
      <Alert alert= {alert} />
      <div className="container">
      <Routes>
        <Route exact path='/' element={<Login showAlert={showAlert} />} />
        <Route exact path='/home' element={<Home showAlert={showAlert}/>} />
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/contact' element={<Contact/>} />
        <Route exact path='/signup' element={<SignUp showAlert={showAlert}/>} />        
      </Routes>
      </div>
    </BrowserRouter>
    </NoteState>   
    </>
  );
}

export default App;