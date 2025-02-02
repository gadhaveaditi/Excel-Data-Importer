import React, { useState } from 'react';
import './styles.css';  // Import your custom CSS file

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);  // Store the selected file
    setError('');
  };

  const handleFileUpload = () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append('file', file);  // 'file' is the file selected by the user

    // Make the API request to upload the file
    setUploading(true);  // Set uploading state
    fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUploading(false);  // Reset uploading state
      })
      .catch(error => {
        console.error('Error:', error);
        setUploading(false);  // Reset uploading state
        setError('Error uploading file');
      });
  };

  return (
    <div className="container">
      <div className="upload-box mt-5">

      <h4 className='text-muted'>Upload Your File</h4>
        <div className="file-input input-group-lg mt-5"> 
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control col-12"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {uploading ? (
          <div className="progress-bar">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Uploading...</span>
            </div>
            <span>Uploading...</span>
          </div>
        ) : (
          <button onClick={handleFileUpload} className="btn btn-primary">
            Upload File
          </button>
          
        )}
      </div>
    </div>
  );
};

export default FileUpload;
