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

function sumAllCounts(countMap) {
  return Object.values(countMap).reduce((acc, cur) => acc + cur, 0);
}

async function main() {
  const products = await getProducts();
  const countMap = {};

  document.querySelector('#products').innerHTML = products
    .map(
      (product, index) => `
    <div class="product" data-product-id="${product.id}" data-product-index="${index}">
      <img src="${product.images[0]}" alt="Image of ${product.name}"/>
      <p>${product.name}</p>
      <div class="flex items-center justify-between">
        <span>Price: ${product.regularPrice}</span>
        <div>
          <button type="button" class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 py-1 px-3 rounded-full text-green-800 hover:bg-green-300">-</button>
          <span class="cart-count text-green-800"></span>
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

    if (
      targetElement.matches('.btn-decrease') ||
      targetElement.matches('.btn-increase')
    ) {
      if (countMap[productId] === undefined || countMap[productId] <= 0) {
        countMap[productId] = 0;
      }
      if (targetElement.matches('.btn-decrease')) {
        countMap[productId] -= 1;
      } else if (targetElement.matches('.btn-increase')) {
        countMap[productId] += 1;
      }
      const cartCount = productElement.querySelector('.cart-count');
      cartCount.innerHTML = countMap[productId];
      if (countMap[productId] <= 0) {
        cartCount.innerHTML = '0';
      }
      document.querySelector('.total_count').innerHTML = `(${sumAllCounts(
        countMap
      )})`;
    }
  });
}

main();
