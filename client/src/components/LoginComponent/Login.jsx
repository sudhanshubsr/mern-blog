import React from 'react'
import axios from 'axios'
import './login.css'
import { Navigate } from 'react-router-dom'
import { useGlobalState } from '../../context/user.context'
const LoginPage = () => {
    const {setUserInfo} = useGlobalState()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [redirect, setRedirect] = React.useState(false)

    const handleLogin = async (e) => {

      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:3001/api/login', {
              username,
              password
          }, { withCredentials: true });
  
          // Check if the response status is in the 2xx range for success
          if (response.status >= 200 && response.status < 300) {
              setUserInfo(response.data)
              setRedirect(true)
              
          } else {
              alert("Login Failed");
          }
      } catch (error) {
          console.error("Error:", error);
          // Handle other error scenarios if needed
          alert("Login Failed");
      }
  };
  

    if(redirect){
      return <Navigate to={'/'}/>
    }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <div className="or-separator">or</div>
      <button className="google-login" disabled>
        Login with Google
      </button>
    </div>
  )
}

export default LoginPage