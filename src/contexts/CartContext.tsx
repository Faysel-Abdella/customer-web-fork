"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

import { getCartItems, getTotalCartPrice } from "@/actions/cart.actions";
import { CartItem } from "@/types/restaurant.types";

import { useAuth } from "./AuthContext";

interface CartContextType {
  cartItems: CartItem[] | null;
  totalItems: number;
  isPending: boolean;
  isLoadingTotalPrice: boolean;
  totalPrice: number;
  refreshCart: () => Promise<void>;
  silentRefreshCart: () => Promise<void>;
  currentRestaurantId: number | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [currentRestaurantId, setCurrentRestaurantId] = useState<number | null>(
    null,
  );
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoadingTotalPrice, startTotalPrice] = useTransition();

  const refreshCart = useCallback(async () => {
    startTransition(async () => {
      const result = await getCartItems();

      if (result.data) {
        if (result.data.length > 0) {
          setCurrentRestaurantId(result.data[0].store_id);
        } else {
          setCurrentRestaurantId(null);
        }
        setCartItems(result.data);

        setTotalItems(result.data.length);
      }
      if (result.error) {
        console.error(
          "An error occurred while refreshing the cart:",
          result.error,
        );
        setCurrentRestaurantId(null);
        setCartItems([]);
        setTotalItems(0);
      }
    });
  }, []);

  const silentRefreshCart = useCallback(async () => {
    const result = await getCartItems();

    if (result.data) {
      if (result.data.length > 0) {
        setCurrentRestaurantId(result.data[0].store_id);
      } else {
        setCurrentRestaurantId(null);
      }
      setCartItems(result.data);
      setTotalItems(result.data.length);
    }
    if (result.error) {
      console.error(
        "An error occurred while refreshing the cart:",
        result.error,
      );
      setCurrentRestaurantId(null);
      setCartItems([]);
      setTotalItems(0);
    }
  }, []);

  useEffect(() => {
    if (user) {
      refreshCart();
    }
  }, [refreshCart, user]);

  useEffect(() => {
    if (user) {
      startTotalPrice(async () => {
        const result = await getTotalCartPrice();

        if (result.data) {
          setTotalPrice(result.data);
        }
        if (result.error) {
          refreshCart();
        }
      });
    }
  }, [cartItems, refreshCart, user]);

  const value = {
    currentRestaurantId,
    cartItems,
    totalItems,
    isPending,
    isLoadingTotalPrice,
    totalPrice,
    refreshCart,
    silentRefreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
