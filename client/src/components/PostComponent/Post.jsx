import React from 'react'
import './post.css'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'

const Post = ({post}) => {

  return (

    <div className='post'>

        <div className='image'>

        <Link to={`/post/${post._id}`}>
        <img src={post.cover} alt="firstimage" />
        </Link>
        </div>
        <div className='texts'>
        <Link to={`/post/${post._id}`}>
        <h2>{post.title}</h2>
        </Link>
        <p className='info'>
          <a href='/' className='author'>{post.author.username}</a>
          <time>{formatISO9075(new Date(post.createdAt))}</time>
        </p>
        <p className='summary'>{post.summary}</p>
        </div>
      </div>
  )
}

export default Post
