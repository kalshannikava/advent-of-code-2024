const fs = require('fs')

const writeToFile = (filename, input, cb) => fs.writeFile(filename, input, (err) => {
   if (err) throw err;
   else {
      console.log("Success!")
      cb && cb();
   }
})

const readFromFile = (filename) => fs.readFileSync(filename, (err) => {
  if (err) throw err;
})

module.exports = { 
  writeToFile,
  readFromFile,
};