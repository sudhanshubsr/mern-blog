import {useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
    };
const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];


const EditPostPage = () => {
const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/post/${id}`)
        .then(response => {
            setTitle(response.data.title);
            setSummary(response.data.summary);
            setContent(response.data.content);
        
        });
    }, [id]);

  async function updatePost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id)
    if(files?.[0]){
        data.set('file',files[0])
    }
    ev.preventDefault();

    const response = await axios.put('http://localhost:3001/api/updatepost', data, {withCredentials: true})
    
    if (response.status >= 200 && response.status < 300) {
      setRedirect(true);
    }
    else {
      alert("Post creation failed");
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }
  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <ReactQuill theme="snow" value={content} modules={modules} formats={formats} onChange={(newValue)=>setContent(newValue)}/>
      <button style={{marginTop:'20px'}}>Update Post</button>
    </form>
  )
}

export default EditPostPage