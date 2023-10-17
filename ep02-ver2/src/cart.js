import { getProductElement } from './products';
import { findElement } from './utils';

export function setUpCart({ container, onIncreaseClick, onDecreaseClick }) {
  const addProduct = ({ product }) => {
    const productElement = getProductElement(product);
    container.appendChild(productElement);
  };

  const removeProduct = ({ product }) => {
    const productElement = container.querySelector(
      `.product[data-product-id='${product.id}']`
    );
    if (productElement) {
      productElement.remove();
    }
  };

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
    if (productElement) {
      const cartCountElement = productElement.querySelector('.cart-count');
      cartCountElement.innerHTML = count;
      if (count <= 0) {
        cartCountElement.innerHTML = '0';
      }
    }
  };

  return {
    addProduct,
    removeProduct,
    updateCount,
  };
}
