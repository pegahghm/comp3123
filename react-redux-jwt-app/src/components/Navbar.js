import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions";
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <Link to="/" className="button">Home</Link>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={() => dispatch(logout())} className="button">Logout</button>
        </>
      ) : (
        <Link to="/login" className="button">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
