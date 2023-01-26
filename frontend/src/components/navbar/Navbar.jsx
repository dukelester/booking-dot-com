import { Link } from "react-router-dom"
import "./navbar.css"
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/'>
        <span className="logo">LesterBooking</span>
        </Link>
        { !user && 
        (<div className="navItems">
          <button className="navButton">Register</button>
          <Link to={'/login'}>
          <button className="navButton">Login</button>
          </Link>
        </div>
        )}
        { user && (
          <div className="navItems">
        {user.username}
          <button className="navButton">Logout</button>
        </div>
        )}
       
      </div>
    </div>
  )
}

export default Navbar