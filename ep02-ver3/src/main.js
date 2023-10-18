import { getProductElement, setUpProducts } from './products';
import { setUpCounter } from './counter';
import { setUpCart } from './cart';
import { findElement } from './utils';

async function main() {
  const { getProductById, updateCount: updateProductCount } =
    await setUpProducts({
      container: document.querySelector('#products'),
      onDecreaseClick,
      onIncreaseClick,
    });

  const {
    addProduct: addProductToCart,
    removeProduct: removeProductFromCart,
    updateCount: updateCartCount,
  } = setUpCart({
    container: document.querySelector('.cart_items'),
    onDecreaseClick,
    onIncreaseClick,
  });

  const { increase, decrease, getTotalCount, getCountByProductId } =
    setUpCounter();

  const updateTotalCount = totalCount => {
    document.querySelector('.total_count').innerHTML = `(${totalCount})`;
  };

  function onIncreaseClick({ productId }) {
    if (getCountByProductId({ productId }) === 0) {
      addProductToCart({ product: getProductById({ productId }) });
    }
    const count = increase({ productId });
    updateTotalCount(getTotalCount());
  }
  function onDecreaseClick({ productId }) {
    const count = decrease({ productId });
    if (count === 0) {
      removeProductFromCart({ product: getProductById({ productId }) });
    }
    updateTotalCount(getTotalCount());
  }

  document.querySelector('.btn-cart').addEventListener('click', () => {
    document.body.classList.add('displaying_cart');
  });
  document.querySelector('.btn-close-cart').addEventListener('click', () => {
    document.body.classList.remove('displaying_cart');
  });
  document.querySelector('.cart-dimmed-bg').addEventListener('click', () => {
    document.body.classList.remove('displaying_cart');
  });
}

main();
