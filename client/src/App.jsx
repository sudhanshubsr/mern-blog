import './App.css';
import IndexPage from './Pages/IndexPage.jsx';
import {Routes, Route} from 'react-router-dom';
import Layout from './Layout.js';
import LoginPage from './Pages/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import CreatePostPage from './Pages/CreatePostPage.jsx';
import PostContentPage from './Pages/PostContentPage.jsx';
import EditPostPage from './Pages/EditPostPage.jsx';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/create' element={<CreatePostPage />} />
        <Route path='/post/:id' element={<PostContentPage />} />
        <Route path='/edit/:id' element={<EditPostPage />} />
      </Route>
    </Routes>
    
  );
}

export default App;
