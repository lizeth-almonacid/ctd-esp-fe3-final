"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

interface CartState {
  cart: any[];
}

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (data: any) => void;
  removeFromCart: (data: any) => void;
  updateQuantity: (data: any, quantity: number) => void;
  clearCart: () => void; // Nueva función para borrar el carrito
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: any }
  | { type: "REMOVE_FROM_CART"; payload: any }
  | { type: "UPDATE_QUANTITY"; payload: { game: any; quantity: number } }
  | { type: "CLEAR_CART" }; // Nuevo tipo de acción para borrar el carrito

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un proveedor CartProvider");
  }
  return context;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCartAdd = [...state.cart, action.payload];
      localStorage.setItem("cart", JSON.stringify(updatedCartAdd));
      return { cart: updatedCartAdd };
    case "REMOVE_FROM_CART":
      const updatedCartRemove = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartRemove));
      return { cart: updatedCartRemove };
    case "UPDATE_QUANTITY":
      const updatedCartUpdate = state.cart.map((item) => {
        if (item.id === action.payload.game.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCartUpdate));
      return { cart: updatedCartUpdate };

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return { cart: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const storedCart =
    typeof window !== "undefined" ? localStorage.getItem("cart") : "";
  const initialState: CartState = {
    cart: storedCart ? JSON.parse(storedCart) : [],
  };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (data: any) => {
    const updatedCartAdd = [...state.cart, { ...data, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCartAdd));
    dispatch({ type: "ADD_TO_CART", payload: data });
  };

  const removeFromCart = (data: any) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: data });
  };

  const updateQuantity = (data: any, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { game: data, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value: CartContextProps = {
    state,
    dispatch,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
