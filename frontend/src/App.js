import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ParamList from "./components/param-list.component";
import EditParam from "./components/edit-param.component";
import CreateParam from "./components/create-param.component";

//import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ParamList} />
      <Route path="/edit/:id" component={EditParam} />
      <Route path="/create" component={CreateParam} />        
      </div>
    </Router>
  );
}

export default App;
