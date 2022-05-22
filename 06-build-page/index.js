const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readFile(path.join(__dirname, "template.html"), (err, template) => {
  if (err) throw err;

  let templateInner = template.toString();

  fs.readdir(path.join(__dirname, "components"), (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      let tag = `{{${path.parse(path.join(__dirname, "components", file)).name}}}`;
      

      fs.readFile(path.join(__dirname, "components", file), (err, data) => {
        if (err) throw err;

        templateInner = templateInner.replace(tag, data.toString());

        fs.rm(path.join(__dirname, 'project-dist', 'index.html'), { recursive: true, force: true }, () => {
            fs.writeFile(
              path.join(__dirname, 'project-dist', 'index.html'),
              templateInner,
              (err) => {
                if (err) throw err;

              });
          });
      });
    });
  });
});


fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (error,files) => {
    if (error) throw error;

    fs.writeFile(path.join(__dirname,'project-dist','syle.css'),'', (error) => {
        if (error) throw error;
    })

    files.forEach(file => {
        if (file.isFile() && file.name.split('.')[1]==='css') {
         fs.readFile (path.join(__dirname, 'styles', file.name), (error, data) => {
            if (error) throw error;

            fs.appendFile(path.join(__dirname,'project-dist','style.css'), data, err => {
                if (err) throw err;})
         }) 
        }
    })
})


fs.mkdir( path.join(__dirname,'project-dist', 'assets'), (error) => {
    if (error) return console.error(error.message);
  })

  function copyDir(name = '') {
    fs.readdir(path.join(__dirname, 'assets', name), { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        if (file.isFile()) {
          fs.copyFile(path.join(__dirname, 'assets', name, file.name), path.join(__dirname, 'project-dist', 'assets', name, file.name), err => {
            if (err) throw err;
          });
        } else {
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', file.name), { recursive: true }, err => {
            if (err) throw err;
          });

          copyDir(file.name);
        }
      });
    });
  }

  copyDir()