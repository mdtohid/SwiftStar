import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import AddCart from './Components/AddCart/AddCart';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';

function App() {
  return (
    <div className="App text-black">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/:productDetailsId' element={<ProductDetails></ProductDetails>}></Route>
        <Route path='/addCart' element={<AddCart></AddCart>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes>
    </div>
  );
}

export default App;
