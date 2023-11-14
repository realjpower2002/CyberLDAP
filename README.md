# CyberLDAP
This is a simple file management service that enables authentication using an LDAP account system, with user permissions based on a unique directory created for each user, that allows users to upload, download, and delete their files to/from a central server.

To use this program, after installing the required react and node packages, cd into the server and run it using the command "node server.js" (without quotes). Then, run the react command "npm start" (without quotes) in the source directory to start the react app.

The app can be logged into by typing the name of a user with a valid directory in server/root, with any password (the real authentication has not been implemented yet). Then, files can be uploaded on the upload page, or downloaded or deleted on the home page.
