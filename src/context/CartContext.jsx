import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.slug === product.slug);

      if (product.stock <= 0) {
        return prev;
      }

      if (exists) {
        const newQuantity = exists.quantity + (product.quantity || 1);
        if (newQuantity > product.stock) {
          return prev.map((item) =>
            item.slug === product.slug
              ? { ...item, quantity: product.stock }
              : item
          );
        }

        return prev.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      return [...prev, { ...product, quantity: product.quantity || 1, stock: product.stock }];
    });
  };


  const removeFromCart = (slug) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  };

  const increaseQuantity = (slug) => {
    setCart(prev =>
      prev.map(item =>
        item.slug === slug
          ? {
            ...item,
            quantity: Math.min(item.quantity + 1, item.stock)
          }
          : item
      )
    );
  };

  const decreaseQuantity = (slug) => {
    setCart(prev =>
      prev.map(item =>
        item.slug === slug
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
