import test from './test.json?raw';

async function getProducts() {
  if (process.env.NODE_ENV === 'development') {
    return JSON.parse(test);
  } else {
    const response = await fetch(
      'https://learnwitheunjae.dev/api/sinabro-js/ecommerce'
    );
    const products = await response.json();
  }
}

function findElement(startingElement, selector) {
  let currentElement = startingElement;
  while (currentElement) {
    if (currentElement.matches(selector)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
}
async function main() {
  const products = await getProducts();

  document.querySelector('#products').innerHTML = products
    .map(
      (product, index) => `
    <div class="product" data-product-id="${product.id}" data-product-index="${index}">
      <img src="${product.images[0]}" alt="Image of ${product.name}"/>
      <p>${product.name}</p>
      <div class="flex items-center justify-between">
        <span>Price: ${product.regularPrice}</span>
        <div>
          <button type="button" class="btn-decrease bg-green-200 py-1 px-3 rounded-full text-green-800 hover:bg-green-300">-</button>
          <span class="hidden text-green-800">3</span>
          <button type="button" class="btn-increase bg-green-200 py-1 px-3 rounded-full text-green-800 hover:bg-green-300">+</button>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  document.querySelector('#products').addEventListener('click', event => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, '.product');
    const productId = productElement.getAttribute('data-product-id');
    const productIndex = productElement.getAttribute('data-product-index');
    const product = products[productIndex];
    console.log(
      '🚀 ~ file: main.js:50 ~ document.querySelector ~ productId:',
      product
    );
    if (targetElement.matches('.btn-decrease')) {
      console.log(
        '🚀 ~ file: main.js:38 ~ document.querySelector ~ btn-decrease:'
      );
    } else if (targetElement.matches('.btn-increase')) {
      console.log(
        '🚀 ~ file: main.js:41 ~ document.querySelector ~ btn-increase:'
      );
    }
  });
}

main();
