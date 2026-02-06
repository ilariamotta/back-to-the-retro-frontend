import { createContext, useContext, useState } from "react";

const WhishListContext = createContext();

export function WhishProvider({ children }) {

    const [wish, setWish] = useState([]);

    const addToWhisList = (product) => {
        setWish((prev) => {
            const exists = prev.find((item) => item.slug === product.slug);

            if (product.stock <= 0) {
                return prev;
            }

            if (exists) {
                if (exists.quantity >= product.stock) {
                    return prev;
                }

                return prev.map((item) =>
                    item.slug === product.slug
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...product, id: product.id, quantity: 1, stock: product.stock }];
        });
    };

    const removeFromWish = (slug) => {
    setWish((prev) => prev.filter((item) => item.slug !== slug));
  };

  const increaseQuantityWish = (slug) => {
    setWish(prev =>
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

  const decreaseQuantityWish = (slug) => {
    setWish(prev =>
      prev.map(item =>
        item.slug === slug
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const clearWish = () => {
    setWish([]);
  };

    return (
        <WhishListContext.Provider value={{ wish, setWish, addToWhisList, removeFromWish, increaseQuantityWish, decreaseQuantityWish, clearWish }}>
            {children}
        </WhishListContext.Provider>
    )
}

export const useWish = () => useContext(WhishListContext)