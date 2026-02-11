import { createContext, useContext, useState } from "react";

const WhishListContext = createContext();

export function WhishProvider({ children }) {

  const [wish, setWish] = useState([]);


  function addToWishList(product) {
    setWish((prev) => {
      const exists = prev.find((element) => element.slug === product.slug);

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

      return [...prev, { ...product, quantity: product.quantity || 1, stock: product.stock, discounted_price: product.discounted_price || null }];
    })




  }

  function removeToList(slug) {
    setWish((prev) => prev.filter((item) => item.slug !== slug));
  };


  function clearList() {
    setWish([])
  }

  return (
    <WhishListContext.Provider value={{ wish, setWish, addToWishList, removeToList, clearList }}>
      {children}
    </WhishListContext.Provider>
  )
}

export const useWishList = () => useContext(WhishListContext)