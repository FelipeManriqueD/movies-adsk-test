import { lazy } from 'react';
import './App.css'


const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));

function App() {

  return (
    <>
      <Login/>
      <Home/>
    </>
  )
}

export default App
