import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const isRegistered = localStorage.getItem('token')
  return isRegistered ? children : <Navigate to='/admin/register' />
}

export default PrivateRoute