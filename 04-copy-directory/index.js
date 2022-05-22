const fs = require('fs');
const path = require('path');

fs.mkdir( path.join(__dirname, 'files-copy'),(error) => {
    if (error) return console.error(error.message);
  })

  fs.readdir(path.join(__dirname,'files'), (error, files) => {
    if (error) return console.error(error.message);
    for (let file of files) {
        fs.copyFile(path.join(__dirname,'files', file),path.join(__dirname,'files-copy',file), error => {
            if (error) return console.error(error.message);
        })
    }
})