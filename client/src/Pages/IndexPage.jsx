import React from 'react'
import Post from '../components/PostComponent/Post'
import axios from 'axios'

const IndexPage = () => {
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => { 
    setLoading(true)
    axios
    .get('http://localhost:3001/api/posts')
    .then((response)=>{
      setPosts(response.data)
      setLoading(false)
    })
  }, [])

  return (
    <>
        {loading && <h1>Loading...</h1>}
        {!loading && 
        <>
          {posts.length > 0 && posts.map((post) => {
            return <Post key={post._id} post={post} />
          })
          }
        </>
        }
    </>
    
  )
}

export default IndexPage