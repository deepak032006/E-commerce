// Profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data and navigate to login page
    setUser(null);
    navigate("/login");
  };

  const getInitial = (email) => {
    return email.charAt(0).toUpperCase(); // Get the first letter of email
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      {/* Profile Image (using the first letter of email) */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full">
          {user ? getInitial(user.email) : ""}
        </div>
        <div className="ml-4">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>

      
      

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};


export default Profile;
