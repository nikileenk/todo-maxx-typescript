import React from 'react';
import './App.css';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const App: React.FC = () => {
  return (
    <>
    {/* <Home/> */}
    <Router>
    <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        
          </Switch>
    </Router>
    </>
  );
}

export default App;
