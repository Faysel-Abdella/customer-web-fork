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

import { checkAuth } from "@/actions/auth.actions";
import { getCartItems, getTotalCartPrice } from "@/actions/cart.actions";
import { CartItem } from "@/types/cart.types";

import { useAuth } from "./AuthContext";

interface CartContextType {
  cartItems: CartItem[] | null;
  totalItems: number;
  isPending: boolean;
  isLoadingTotalPrice: boolean;
  totalPrice: number;
  refreshCart: () => void;
  silentRefreshCart: () => void;
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isLoadingTotalPrice, startTotalPrice] = useTransition();

  const fetchAndSetCartData = useCallback(async () => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      setCartItems([]);
      setTotalItems(0);
      setTotalPrice(0);
      setCurrentRestaurantId(null);
      return;
    }

    const itemsResult = await getCartItems();

    if (itemsResult.error || !itemsResult.data) {
      console.error("Failed to get cart items:", itemsResult.error);
      setCartItems([]);
      setTotalItems(0);
      setTotalPrice(0);
      setCurrentRestaurantId(null);
      return;
    }

    const cartData = itemsResult.data;
    setCartItems(cartData);
    setTotalItems(cartData.length);

    if (cartData.length > 0) {
      setCurrentRestaurantId(cartData[0].store_id);
      startTotalPrice(async () => {
        const priceResult = await getTotalCartPrice();
        if (priceResult.data) {
          setTotalPrice(priceResult.data);
        }
      });
    } else {
      setCurrentRestaurantId(null);
      setTotalPrice(0);
    }
  }, []);

  const refreshCart = useCallback(() => {
    startTransition(async () => {
      await fetchAndSetCartData();
    });
  }, [fetchAndSetCartData]);

  const silentRefreshCart = useCallback(async () => {
    await fetchAndSetCartData();
  }, [fetchAndSetCartData]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart, user]);

  const value = {
    currentRestaurantId,
    cartItems,
    totalItems,
    isPending,
    totalPrice,
    isLoadingTotalPrice,
    refreshCart,
    silentRefreshCart, // Expose the silent refresh function
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
