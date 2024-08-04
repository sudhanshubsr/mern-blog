import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGlobalState } from '../context/user.context';

const PostContentPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const { userInfo } = useGlobalState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
      .then((response) => {
        setPostInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Added [id] as a dependency for useEffect

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="author">by @{postInfo.author?.username}</div>
      {userInfo?.id === postInfo.author?._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            Edit this Post
          </Link>
        </div>
      )}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostContentPage;
