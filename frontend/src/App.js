import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Component/register';
import Login from './Component/login';
import Dashboard from './Component/dashboard';
import Logout from './Component/logout';
import Project from './Component/project';
import Startproject from './Component/project/start';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/start" element={<Startproject />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
