const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.writeFile( path.join(__dirname, 'text.txt'),'',(error) => {
    if (error) return console.error(error.message);
  })

stdout.write('Введите ваш текст \n');

    stdin.on('data', data => {
        if (data.toString().trim() === 'exit') {
            stdout.write('До встречи \n');
            process.exit();
        }

        fs.appendFile(
            path.join(__dirname, 'text.txt'),
            data,
            err => {
              if (err) throw err;
            }
          ); 
    });

    process.on('SIGINT', () => {
        stdout.write('До встречи! \n');
        process.exit();
    });