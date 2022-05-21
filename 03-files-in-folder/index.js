const fs = require('fs');
const path = require('path');


const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, { withFileTypes: true }, (error, files) => {
    if (error) return console.error(error.message);
    for (let file of files) {
       if (file.isFile()) {
           fs.stat(path.join(secretFolder, file.name), (error, stats) => {
               console.log (`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats['size']}b`)
           } )
       }
    }
});

