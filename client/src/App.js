import './App.css';
import { Route,Routes,/* Link */ } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
      <Route path='/hello' element={<h1>hello world</h1>}/>
    </Routes>
    </div>
  );
}

export default App;
