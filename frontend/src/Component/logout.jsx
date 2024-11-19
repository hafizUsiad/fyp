// Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to the login page (or home page)
    navigate('/sign-in');
  }, [navigate]);

  return null; // Component renders nothing
}

export default Logout;
