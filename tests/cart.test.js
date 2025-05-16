const { addToCart, getCart } = require('../public_html/cart.html');

describe('Cart functionality', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('adds item to cart', () => {
    addToCart('Pizza', 2);
    const cart = getCart();
    expect(cart).toEqual([{ item: 'Pizza', quantity: 2 }]);
  });

  test('adds multiple items to cart', () => {
    addToCart('Pizza', 2);
    addToCart('Burger', 1);
    const cart = getCart();
    expect(cart.length).toBe(2);
  });
});
