const fs = require('fs');
const path = require('path');

fs.mkdir( path.join(__dirname, 'files-copy'),(error) => {
    if (error) return console.error(error.message);
  })

  function copyDir(dirName,newDirName) {
  fs.readdir(path.join(__dirname,dirName), (error, files) => {
    if (error) return console.error(error.message);
   files.forEach (file => {
        fs.copyFile(path.join(__dirname,dirName, file),path.join(__dirname,newDirName,file), error => {
            if (error) return console.error(error.message);
        })
    })
})
  }

  copyDir('files','files-copy')