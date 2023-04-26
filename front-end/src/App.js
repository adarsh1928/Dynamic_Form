
import React, { useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';

import MainInputFields from './InputFields/MainInputFields';
import PageForTakingInputFromUser from './InputFields/PageForTakingInputFromUser';
// import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';


function App() {
  return (
        
 <Router>
  <Routes>
    <Route path="/" element={<MainInputFields/>}/>
    <Route path="/PageForTakingInputFromUser" element={<PageForTakingInputFromUser/>}/>
  </Routes>
 </Router>

        
      
      
  );
}

export default App;
