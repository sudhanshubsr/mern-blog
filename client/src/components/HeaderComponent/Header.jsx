import './header.css'
import axios from 'axios'

import { useGlobalState } from '../../context/user.context'
import  { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
const baseapiurl = process.env.REACT_APP_API_URL
console.log(baseapiurl)
const Header = () => {
  const { userInfo, setUserInfo } = useGlobalState()
  
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`${baseapiurl}/profile`, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setUserInfo(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },[setUserInfo])

  const logout = async () => {
    try {
      const response = await axios.post(`${baseapiurl}/logout`, null, {
        withCredentials: true,
      });

      if (response.status >= 200 && response.status < 300) {
      setUserInfo(null);
      navigate('/')
      }
      else {
        alert("Logout Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const username = userInfo?.username

  return (
    <header>
      <Link to="/" className="logo">
        PulseOfMe 
      </Link>
      {username && (
        <nav>
          <Link to="/create">Create New Post</Link>
          <a href="/" onClick={logout}>Logout</a>
        </nav>
      )}
      {!username && (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}
    </header>
  )
}

export default Header