const express = require('express');
const cors = require('cors');
const fs = require('fs/promises'); // File system module with promises (Node.js v14.0.0 or later)
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON in the request body

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const username = req.params.username;
      const userDirectory = `root/${username}`;
      cb(null, userDirectory);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
  
const upload = multer({ storage: storage });
  
app.post('/upload/:username', upload.single('file'), async (req, res) => {
    try {
      const username = req.params.username;
      const userDirectory = `root/${username}`;
  
      // Ensure the user directory exists
      await fs.mkdir(userDirectory, { recursive: true });
  
      res.send('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/root/:username/:filename', async (req, res) => {
    try {
      const username = req.params.username;
      const filename = req.params.filename;
      const filePath = `root/${username}/${filename}`;
  
      const fileContent = await fs.readFile(filePath, 'utf-8');
  
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.send(fileContent);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/root/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const directoryPath = `root/${username}`; // Change this to the actual path

    // Read the files in the directory
    const files = await fs.readdir(directoryPath);

    const fileContents = await Promise.all(
        files.map(async(file) => {
            const filePath = path.join(directoryPath,file);
            const content = await fs.readFile(filePath, 'utf-8');
            return {filename:file,content};
        })
    )

    res.json({ files: fileContents });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/root/:username/:filename', async (req, res) => {
    try {
      const username = req.params.username;
      const filename = req.params.filename;
      const filePath = `root/${username}/${filename}`;
  
      // Check if the file exists
      const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
  
      if (!fileExists) {
        res.status(404).json({ error: 'File not found' });
        return;
      }
  
      // Delete the file
      await fs.unlink(filePath);
      res.send('File deleted successfully!');
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});