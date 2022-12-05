import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './Pages/Login';
import Signin from './Pages/Signin';
import Home from './Pages/Home';



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/signin'/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>

  );
}

export default App;
