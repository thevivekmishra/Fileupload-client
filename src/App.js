import { useRef, useState, useEffect } from 'react';
import './App.css';
import upload from './assets/upload.png';
import { uploadFile } from './services/api.js';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [uploading, setUploading] = useState(false); // upload status state

  const fileInputRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setUploading(true); // Set uploading to true when a file is selected

        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        try {
          let response = await uploadFile(data);
          setResult(response.path);
          toast.success('File uploaded successfully!'); 
        } catch (error) {
          toast.error('File upload failed.'); 
        } finally {
          setUploading(false); // Set uploading to false after the upload is complete
        }
      }
    };
    getImage();
  }, [file]);

  return (
    <div className="container">
      <Toaster />
      <div className="box">
        <h1>Effortlessly Share Your Files!</h1>
        <p>Upload your file in just a click and receive a link to share instantly.</p>
        <p>Hang tight after uploading; your download link will be ready shortly!</p>
        <button className="button" onClick={onUploadClick}>
          Upload
          <img src={upload} className="upload-img" alt="upload icon" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        {uploading && ( 
          <div className="uploading-message">
            Uploading Please Wait...
          </div>
        )}
        {result && (
          <div className="link">
            <a href={result} target="_blank" rel="noopener noreferrer" className='live-link'>{result}</a>
            <button className="copy-button" onClick={copyToClipboard}>Copy Link</button>
          </div>
        )}
         
      </div>
  
      <div className="credit">
        <p>Designed and Developed by Vivek Kumar Mishra </p>
      </div>
    </div>
  );
}

export default App;

