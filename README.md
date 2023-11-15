# CyberLDAP
CyberLDAP is a simple file management service that enables authentication using an LDAP account system, with user permissions based on a unique directory created for each user, that allows users to upload, download, and delete their files to/from a central server.

To set up this project on your computer, 

-Copy the git repository link from the green "Code" button. Then, open VSCode and click on "Clone a Git Repository" in the homepage (after closing any folders or workspaces you are in). Then, select a folder to be your project folder to store the cloned repository.

-Install Node.js from the Node.js website using the "Long Term Support" (LTS) option for your specific operating system. This should install npm as well. To check that node and npm are installed, run "node --version" and "npm --version" in a VSCode Terminal. These commands should not return errors.

-To install the necessary packages for the project, type the command "cd server" in a VSCode Terminal in your project folder, and then run the commands "npm install express cors multer". Then, open another terminal, and type "cd src" to enter the source file for the React app, and then run the commands "npm install react react-router-dom". Ignore messages listing vulnerabilities in the packages. All of the necessary packages should now be installed.

------------------------------------------------------------------------------------------------------------------------------------------------

To run this program, 

-Enter the server terminal we started earlier and run the command "node server.js" (without quotes). This will start the application server.

-Re-enter the react app terminal we started run the react command "npm start" (without quotes) in the source directory. This will start the react app, and open it in a new window on localhost:3000.

The app can be logged into by typing the name of a user with a valid directory in server/root, with any password (the real authentication has not been implemented yet). Then, files can be uploaded on the upload page, or downloaded or deleted on the home page.
