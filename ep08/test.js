import fs from 'fs';
import util from 'util';
// fs.readFile('package.json', (error, file) => {
//   console.log('#### result ####');
//   console.log(file.toString());
// });

// function readFilePromise(filename) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filename, (error, file) => {
//       error ? reject(error) : resolve(file);
//     });
//   });
// }

const readFilePromise = util.promisify(fs.readFile);

try {
  const file = await readFilePromise('package.json');
  console.log(file.toString());
} catch (error) {
  console.error('#### Error');
  console.error(error);
}
