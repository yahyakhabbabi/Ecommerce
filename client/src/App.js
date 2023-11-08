import './App.css';
import { Route,Routes,/* Link */ } from 'react-router-dom';
import LoginPage  from './containers/BackOffice/Login/LoginPage'; 
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      {/* <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/> */}
    </Routes>
    
    </div>
  );
}

export default App;
