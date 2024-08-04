import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../context/user.context';
import './header.css';

const baseApiUrl = process.env.REACT_APP_API_URL;

const Header = () => {
  const { userInfo, setUserInfo } = useGlobalState();
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/users/profile`, {
        withCredentials: true,
      });
      setUserInfo(response.data.token || response.data.user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserInfo(null);
    }
  }, [setUserInfo]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseApiUrl}/users/logout`, null, {
        withCredentials: true,
      });

      if (response.status >= 200 && response.status < 300) {
        setUserInfo(null);
        navigate('/');
      } else {
        console.error('Logout failed:', response);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const username = userInfo?.username || userInfo?.displayName;

  return (
    <header>
      <Link to="/" className="logo">
        PulseOfMe
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create New Post</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
