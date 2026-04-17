import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCartState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const setCart = (newCart) => {
    setCartState(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.name === product.name);
    const newCart = existing
      ? cart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];
    setCart(newCart);
  };

  const removeFromCart = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const increaseQty = (name) => {
    setCart(
      cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (name) => {
    setCart(
      cart
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};