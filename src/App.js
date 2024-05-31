import { useRef, useState, useEffect } from 'react';
import './App.css';
import upload from './assets/upload.png';
import { uploadFile } from './services/api.js';

function App() {
  const [file, setFile] = useState('');
  const [result,setResult ] = useState(' ');

  const fileInputRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        let response = await uploadFile(data);
        setResult(response.path);
        // console.log(response);
      }
    };
    getImage();
  }, [file]);

  return (
    <div className="container">
      <div className="box">
        <h1>Share your file easily</h1>
        <p>Simply upload the file and send link to download.</p>
        <button className="button" onClick={() => onUploadClick()}>
          Upload
          <img src={upload} className="upload-img" alt="upload icon" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <div className='link'>
        <a href = {result} target="_blank">{result}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
