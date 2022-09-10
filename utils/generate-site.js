const fs = require('fs');

//function to write file as a Promise
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if there's an error, reject the Promise and send the error to the Promise's .catch() method
            if (err) {
                reject(err);
                // return out of function here to make sure Promise doesn't accidentally execute
                return;
            }
            
            // if everything was succeessful, resolve the Promise and send data to .then() method
            resolve ({
                ok: true,
                message: 'File Created!'
            })
        })
    })
    };


    //function to copy file as a Promise
const copyFile = fileContent => {
    return new Promise((resolve, reject) =>{
        fs.copyFile('./style.css', fileContent, err =>{
            if (err) {
                reject(err);
                return;
            }

            resolve ({
                ok: true,
                message: 'File Copied!'
            })
        })
    })
};

module.exports = {writeFile, copyFile};

