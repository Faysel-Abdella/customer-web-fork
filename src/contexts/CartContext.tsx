"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { CartItem } from "@/types/restaurant.types";

interface CartContextType {
  cartItems: CartItem[] | null;
  totalItems: number;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
  silentRefreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
interface CartItemResponse {
  list: CartItem[];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshCart = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setCartItems([]);
      setTotalItems(0);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/cart/my-cart-list", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized: Token might be expired.");
        }
        throw new Error(`Failed to fetch cart: ${response.statusText}`);
      }

      const result: CartItemResponse = await response.json();

      setCartItems(result.list);
      setTotalItems(result.list.length);
    } catch (error) {
      console.error("An error occurred while refreshing the cart:", error);
      setCartItems([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const silentRefreshCart = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setCartItems([]);
      setTotalItems(0);
      return;
    }

    try {
      const response = await fetch("/api/cart/my-cart-list", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized: Token might be expired.");
        }
        throw new Error(`Failed to fetch cart: ${response.statusText}`);
      }

      const result: CartItemResponse = await response.json();

      setCartItems(result.list);
      setTotalItems(result.list.length);
    } catch (error) {
      console.error("An error occurred while refreshing the cart:", error);
      setCartItems([]);
      setTotalItems(0);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const value = {
    cartItems,
    totalItems,
    isLoading,
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
