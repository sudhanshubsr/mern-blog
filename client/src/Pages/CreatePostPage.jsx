import {useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

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

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    console.log(files)
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/createpost`, data, {withCredentials: true})

    if (response.status >= 200 && response.status < 300) {
      setRedirect(true);
    }
    else {
      alert("Post creation failed");
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
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
      <button style={{marginTop:'20px'}}>Create post</button>
    </form>
  );
}
