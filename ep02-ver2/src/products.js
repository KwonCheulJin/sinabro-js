import test from './test.json?raw';
import { findElement } from './utils';

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

export function getProductElement(product, count = 0) {
  const element = document.createElement('div');
  element.classList.add('product');
  element.setAttribute('data-product-id', product.id);
  element.innerHTML = `
    <img src="${product.images[0]}" alt="Image of ${product.name}"/>
    <p>${product.name}</p>
    <div class="flex items-center justify-between">
      <span>Price: ${product.regularPrice}</span>
      <div>
        <button type="button" class="btn-decrease disabled:cursor-not-allowed disabled:opacity-50 bg-green-200 py-1 px-3 rounded-full text-green-800 hover:bg-green-300">-</button>
        <span class="cart-count text-green-800">${count}</span>
        <button type="button" class="btn-increase bg-green-200 py-1 px-3 rounded-full text-green-800 hover:bg-green-300">+</button>
      </div>
    </div>
  `;
  return element;
}

export async function setUpProducts({
  container,
  onIncreaseClick,
  onDecreaseClick,
}) {
  const products = await getProducts();
  const productMap = {};
  products.forEach(product => {
    productMap[product.id] = product;
    const productElement = getProductElement(product);
    container.appendChild(productElement);
  });

  container.addEventListener('click', event => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, '.product');
    const productId = productElement.getAttribute('data-product-id');

    if (
      targetElement.matches('.btn-decrease') ||
      targetElement.matches('.btn-increase')
    ) {
      if (targetElement.matches('.btn-decrease')) {
        onDecreaseClick({ productId });
      } else if (targetElement.matches('.btn-increase')) {
        onIncreaseClick({ productId });
      }
    }
  });

  const updateCount = ({ productId, count }) => {
    const productElement = container.querySelector(
      `.product[data-product-id='${productId}']`
    );
    const cartCountElement = productElement.querySelector('.cart-count');
    cartCountElement.innerHTML = count;
    if (count <= 0) {
      cartCountElement.innerHTML = '0';
    }
  };

  const getProductById = ({ productId }) => {
    return productMap[productId];
  };

  return { getProductById, updateCount };
}
