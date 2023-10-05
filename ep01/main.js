// document.querySelector('#app').innerHTML = `
//   <button type="button" class="hello1">Hello1</button>
//   <button type="button" class="hello2">Hello2</button>
//   <button type="button" class="hello3">Hello3</button>

//   <div>
//     <input class="name" type="text" placeholder="Type user name:" />
//   </div>

//   <div class="parent-of-button">
//     <button class="helloWorld-button" type="button">
//       <span>Hello</span>
//       <span>World</span>
//     </button>
//   </div>
// `;

// document.querySelector('button')?.addEventListener('click', event => {
//   const input = document.querySelector('.name');
//   console.log(input.value);
// });

// document.querySelector('.name')?.addEventListener('input', e => {
//   console.log(e.target.value);
// });

// document.querySelector('.helloWorld-button')?.addEventListener('click', e => {
//   e.stopPropagation(); //버튼의 이벤트가 더이상 올라가지 않게
//   console.log('event from button', e);
// });

// document.querySelector('.parent-of-button')?.addEventListener('click', e => {
//   console.log('event from div', e);
// });

// document.querySelector('.name')?.addEventListener('keyup', e => {
//   console.log(e.target.value);
// });

// NOTE: 단축기 관련 라이브러리 hotkey-js

// document.querySelector('#app').innerHTML = `
//   <input />
//   <button>Click</button>
// `;

// document.querySelector('button')?.addEventListener('click', event => {
//   const currentValue = document.querySelector('input').value;

//   document.querySelector('input').value = currentValue + '*';
// });

// let count = 0;
// setInterval(() => {
//   count += 1;
//   document.querySelector('#app').innerHTML = `
//     <input />
//     <button>Click</button>
//     <p>count: ${count}</p>
//   `;
// }, 5000);

document.querySelector('#app').innerHTML = `
  <button type="button" class="btn-add-card">Add Card</button>

  <div class="cards"></div>
`;

let cardCount = 0;
document.querySelector('.btn-add-card')?.addEventListener('click', () => {
  cardCount += 1;
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <p>Card #${cardCount}</p>
    <button type="button" class="btn-hello" data-number="${cardCount}">hello</button>
  `;
  const myCardCount = cardCount;
  // card.querySelector('.btn-hello')?.addEventListener('click', () => {
  //   console.log(`✅ ${myCardCount}`);
  // });
  document.querySelector('.cards')?.append(card);
});

document.querySelector('.cards')?.addEventListener('click', e => {
  // console.log('click from .cards', e);
  const maybeButton = e.target;
  if (e.target.matches('.btn-hello')) {
    console.log('button is clicked!', maybeButton.getAttribute('data-number'));
  } else {
    console.log('something else');
  }
});
