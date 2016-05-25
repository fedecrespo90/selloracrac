# This is the RACRAC's label Repo
## Stack:
* MongoDB
* Node.js / Express.js
* Angular *
<h3>Installation:</h3>
* First of all you have to download and install this:
* [MongoDB](https://www.mongodb.org/dl/win32/i386)
* [Node.js](https://nodejs.org/en/download/)
* Create this folder's path: 'C:/data/db'
<h3>Setting Environment Variables:</h3>
* Go to properties of Computer
* Click on 'Advanced system settings'
* Click on Environment Variables button
* Selecting PATH option, click on Edit button
* Paste the path of the files of MongoDB that you installed previously and close it with a ';'
<h3>Importing database dumps:</h3>
* Place on 'dumps' folder run the following command: _mongoimport --db sello --collection bandas name_of_json_file.json__
<h3>Running the application:</h3>
* Open CMD / Bash and type 'mongod' (maybe you have to run 'mongod --repair' to close a previous process)
* In another CMD / Bash (place on app/ folder) run _node server.js__

And that's it! :)
