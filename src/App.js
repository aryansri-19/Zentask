import React, {useState} from 'react';
import Home from './Components/home'
import GetStarted from './Components/getStartedPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Components/register';
function App() {
  const [mode, setMode] = useState('light')
    function toggleMode(){
        if(mode==='light')
        {
            setMode('dark')
            document.body.style.backgroundColor = "#192734"
        }
        else
        {
            setMode('light')
            document.body.style.backgroundColor = "rgb(227, 227, 227)"
        }
    }
  return (
   <div>
   <BrowserRouter>
   <Routes>
    <Route exact path='/' element={<GetStarted mode={mode} toggleMode={toggleMode}/>}/>
    <Route exact path='/register' element={<Signup mode={mode} toggleMode={toggleMode}/>}/>
    <Route exact path='/home/:id/*' element={<Home mode={mode} toggleMode={toggleMode}/>}/>
   </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App;
