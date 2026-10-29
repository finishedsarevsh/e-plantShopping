import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const cost = parseFloat(item.cost.substring(1));
      total += cost * item.quantity;
    });
    return total.toFixed(2);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    // support both item object or item name directly
    const name = typeof item === 'object' && item.name ? item.name : item;
    dispatch(removeItem(name));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading" style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p className="cart-empty-text">
            🌱 Your cart is empty — go pick some plants!
          </p>
          <div className="continue_shopping_btn">
            <button
              className="get-started-button continue-shopping"
              onClick={(e) => handleContinueShopping(e)}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cart.map((item) => (
              <div className="cart-item cart-item-card" key={item.name}>
                <img
                  className="cart-item-image"
                  src={item.image}
                  alt={item.name}
                />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">
                    Unit Price: <strong>{item.cost}</strong>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-button cart-item-button-dec qty-btn"
                      onClick={() => handleDecrement(item)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value qty-display">
                      {item.quantity}
                    </span>
                    <button
                      className="cart-item-button cart-item-button-inc qty-btn"
                      onClick={() => handleIncrement(item)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total cart-item-subtotal">
                    Total: ${calculateTotalCost(item)}
                  </div>
                  <button
                    className="cart-item-delete delete-btn"
                    onClick={() => handleRemove(item)}
                    aria-label={`Remove ${item.name}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>

          <div className="continue_shopping_btn cart-actions">
            <button
              className="get-started-button continue-shopping"
              onClick={(e) => handleContinueShopping(e)}
            >
              Continue Shopping
            </button>
            <button
              className="get-started-button1 checkout-btn"
              onClick={(e) => handleCheckoutShopping(e)}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
