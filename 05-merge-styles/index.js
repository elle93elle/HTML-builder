const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (error,files) => {
    if (error) throw error;

    fs.writeFile(path.join(__dirname,'project-dist','bundle.css'),'', (error) => {
        if (error) throw error;
    })

    files.forEach(file => {
        if (file.isFile() && file.name.split('.')[1]==='css') {
         fs.readFile (path.join(__dirname, 'styles', file.name), (error, data) => {
            if (error) throw error;

            fs.appendFile(path.join(__dirname,'project-dist','bundle.css'), data, err => {
                if (err) throw err;})
         }) 
        }
    })
})