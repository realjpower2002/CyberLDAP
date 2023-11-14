import React, {useState, useEffect} from 'react';

const Upload = ( {isAuth, username} ) => {

  const [file, setFile] = useState(null);

  useEffect(() => {
    if(!isAuth) {
      window.location.pathname = "/login";
    }
  }, [username]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await fetch(`http://localhost:3001/upload/${username}`, {
        method: 'POST',
        body: formData,
      });

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      {isAuth &&
      <div>
        <h2>Upload File for {username} . . .</h2>
        <label>
            Select File:
            <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <button onClick={handleUpload}>Upload</button>
      </div>
      }
    </>
  );
};

export default Upload;