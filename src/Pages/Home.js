// src/components/Home.js
import React, {useState, useEffect} from 'react';

const Home = ( {isAuth, username} ) => {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if(!isAuth) {
      window.location.pathname = "/login";
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/root/${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            //REMOVE THIS ^^^ WHEN WE USE THE REAL SERVER
          },
        });

        if (!response.ok) {
          throw new Error('Bad network response');
        }

        const data = await response.json();
        setFiles(data.files);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username]);

  const downloadFile = async (filename) => {
    try {
      const response = await fetch(`http://localhost:3001/root/${username}/${filename}`);
      const blob = await response.blob();
      
      // Create a download link and trigger a click to start the download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const deleteFile = async (filename) => {
    try {
      await fetch(`http://localhost:3001/root/${username}/${filename}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

      // Update the file list after deletion
      setFiles((prevFiles) => prevFiles.filter((file) => file.filename !== filename));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <>
      {isAuth &&
      <div id="file-section" class="section">
        <h2>File List for {username} . . .</h2>
        <ul>
          {files.map((file, index) => (
            <>
              <li key={index}>
                <h4>{file.filename}</h4>
                <button className="round-button" onClick ={() => downloadFile(file.filename)}>Download</button>
                <button className="round-button" onClick ={() => deleteFile(file.filename)}>Delete</button>
                <pre className='file-content'>{file.content}</pre>
              </li>
            </>
          ))}
        </ul>
      </div>
      }
    </>
  );
};

export default Home;