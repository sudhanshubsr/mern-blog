import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import './register.css'
const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`,{
      username,
      email,
      password
    })

    if(response.status === 200){
      alert("Registration successful")
    }
    else{
      alert("Registration failed")
    }
  }

  return (
    <div className="register-container">
      <h2 className="register-header">Register</h2>
      <form  onSubmit={handleRegister} className="register-form">
        <label className="register-label">
          Username:
          <input
            type="text"
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="register-input"
          />
        </label>
        <label className="register-label">
          Email:
          <input
            type="email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
        </label>
        <label className="register-label">
          Password:
          <input
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
        </label>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register