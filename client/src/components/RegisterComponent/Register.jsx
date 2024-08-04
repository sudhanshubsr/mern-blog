import axios from 'axios';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const initialState = {
    username: '',
    email: '',
    password: '',
  };

  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(initialState);
  const usernameRef = useRef(null);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        { user }
      );
      toast.success(response.data.message || 'Registration successful');
      console.log(response);
      if (response.status === 201) {
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Registration Failed');
      setUser(initialState);
      usernameRef.current.focus();
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="register-container">
      <h2 className="register-header">Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <label className="register-label">
          Username:
          <input
            type="text"
            ref={usernameRef}
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            className="register-input"
            autoFocus
          />
        </label>
        <label className="register-label">
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="register-input"
          />
        </label>
        <label className="register-label">
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            className="register-input"
          />
        </label>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
