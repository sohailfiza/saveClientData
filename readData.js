const fs = require('fs');
const filePath = 'D:/Sem 3/Back End Technology Lab/Exp_2/new.txt';
fs.readFile(filePath, 'utf8', (error, data) => {
  if (error) throw error;
  console.log('File content: \n', data);
});
