import { lazy } from 'react';
import './App.css'


const Login = lazy(() => import('./pages/Login/Login'));
const Home = lazy(() => import('./pages/Home/Home'));
const Detail = lazy(() => import('./pages/Detail/Detail'));


function App() {

  return (
    <>
      <Login/>
      <Home/>
      <Detail/>
    </>
  )
}

export default App
