# This is the RACRAC's label Repo
## Stack:
* MongoDB
* Node.js / Express.js
* Angular
<h3>Installation:</h3>
* Go to: [MongoDB](https://www.mongodb.org/dl/win32/i386), and download the installation file
* Go to: [Node.js](https://nodejs.org/en/download/), and download the installation file
* Create this folder's path: 'C:/data/db' (for MongoDB)
* Now, in another folder, clone the repo: _git clone https://github.com/fedecrespo90/selloracrac_
* Place on app/ folder run: _npm install_
<h3>Setting Environment Variables:</h3>
* Go to properties of Computer
* Click on 'Advanced system settings'
* Click on Environment Variables button
* Selecting PATH option, click on Edit button
* Paste the path of the executable files of MongoDB (example: 'C:\Program Files (x86)\MongoDB\Server\3.0\bin;') that you installed previously and close it with a ';'
<h3>Creating local DB and Importing documents:</h3>
* Open CMD / Bash and type 'mongod' (maybe you have to run 'mongod --repair' to close a previous process)
* In another CMD / Bash type 'mongo' and, then, the following commands: _use sello; db.createCollection("bandas");_
* Then, create users collection: _db.createCollection("users");_
* Place on 'documents' folder run the following command: _mongoimport --db sello --collection bandas name_of_json_file.json_
<h3>Running the application:</h3>
* In another CMD / Bash (place on app/ folder) run _node server.js_
* In your browser type _http://localhost:3000_
<h3>Creating a user for the first time:</h3>
* In your browser put this url: _http://localhost:3000/#/signup_

And that's it! :)
