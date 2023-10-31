// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(res => console.log(res))
//   .then(res => res.json())
//   .catch(e => console.error(e));

// function returnPromise() {
//   return new Promise((resolve, reject) => {
//     resolve(3);
//     // reject('this is an error')
//   });
// }

// const promise = returnPromise();
// const result = await promise;
// console.log(result);

// function printDelayedMessage(message, timeout) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(message);
//       // resolve('success');
//       reject('error!!!');
//     }, timeout);
//   });
// }

// async function main() {
//   console.log('before resolving promise');
//   try {
//     await printDelayedMessage('hi', 1000);
//   } catch (error) {
//     console.log('error:', error);
//   }
//   console.log('after resolving promise');
// }

// main();

async function getTodo(id) {
  if (id === 2) {
    throw new Error(`error getting todo for ${id}`);
  }
  return await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
}

const promise1 = getTodo(1);
const promise2 = getTodo(2);
const promise3 = getTodo(3);

try {
  const responses = await Promise.allSettled([promise1, promise2, promise3]);
  console.log('🚀 ~ file: main.js:48 ~ responses:', responses);
} catch (error) {
  console.log('🚀 ~ file: main.js:54 ~ error:', error);
}

// const jsons = await Promise.all(responses.map(response => response.json()));
// console.log('🚀 ~ file: main.js:51 ~ jsons:', jsons);

// const response1 = await getTodo(1);
// const json1 = await response1.json();
// console.log(json1);

// const response2 = await getTodo(2);
// const json2 = await response2.json();
// console.log(json2);

// const response3 = await getTodo(3);
// const json3 = await response3.json();
// console.log(json3);
