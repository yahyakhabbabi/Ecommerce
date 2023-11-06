import './App.css';
import React from 'react';
import UsersListPage from './containers/BackOffice/Users/UsersListPage';
import {Route,Routes} from "react-router-dom"
function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/users" element={<UsersListPage />}/>
      </Routes>
    
    </div>
  );
}

export default App;
