import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = ({ isAdmin }) => {
  const { logout, user } = useUser();
 
  useEffect(()=>{
    console.log(user);
    console.log("user");
  },[user,user?.role])
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link to="/">CodeZen</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>

          {user?.role === "admin" && (
            <>
              <Link to="/problems" className="text-gray-300 hover:text-white">
                Problems
              </Link>

            </>
          )}


          {user && <Link to="/submissions" className="text-gray-300 hover:text-white">
            Submissions
          </Link>}


          {user ? (
            <button className="text-gray-300 hover:text-white" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-white">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
