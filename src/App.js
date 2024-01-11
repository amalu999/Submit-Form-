import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign:"center"}}>Submit Form</h1>
      <Routes>
        <Route path='/' element={<Layout/>}></Route>
        <Route path='add' element={<AddUser/>}></Route>
        <Route path='edit/:id' element={<EditUser/>}></Route>

      </Routes>

    </div>
  );
}

export default App;
