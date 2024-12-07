
import { useContext } from 'react';
import './App.css';
import { StoreContext } from './Cotext/StoreContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPopUp from './Components/LoginPopUp/Login';
import AdminDashboard from './Components/AdminPanel/AdimDashboard';
import EmployeeDashBoard from './Components/EmployeePanel/EmployeeDashBoard';

function App() {

  const {token}=useContext(StoreContext);

  console.log(token)

  const PrivateRoute = ({ children, role }) => {
    const storedToken = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!storedToken) return <Navigate to="/login" replace/>;
   console.log(role,userRole)
    return role === userRole ? children : <Navigate to="/login" replace />;
  };
  return (
    <Routes>

      <Route path='/'  element={<Navigate to='/login'/>}/>
      <Route path='/login' element={<LoginPopUp/>}/>

      <Route path='/admin-panel'  element={<PrivateRoute role='admin'>
        <AdminDashboard/>
      </PrivateRoute>}/>


      <Route path='/employee-panel'  element={<PrivateRoute role='employee'>
         <EmployeeDashBoard/>
        </PrivateRoute>}/>


    </Routes>
  );
}

export default App;
