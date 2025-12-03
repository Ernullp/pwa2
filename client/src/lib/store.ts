import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItemWithProduct, WishlistItemWithProduct } from '@shared/schema';

// Theme store
interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { theme: newTheme };
        }),
      setTheme: (theme) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme });
      },
    }),
    {
      name: 'dermarokh-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      },
    }
  )
);

// Cart store
interface CartState {
  items: CartItemWithProduct[];
  sessionId: string;
  discountCode: string | null;
  discountPercent: number;
  setItems: (items: CartItemWithProduct[]) => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string, percent: number) => void;
  removeDiscount: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getItemCount: () => number;
}

const generateSessionId = () => {
  return 'sess_' + Math.random().toString(36).substring(2, 15);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      sessionId: generateSessionId(),
      discountCode: null,
      discountPercent: 0,
      setItems: (items) => set({ items }),
      addItem: (product, quantity = 1) => {
        const { items, sessionId } = get();
        const existingItem = items.find((item) => item.productId === product.id);
        
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: 'cart_' + Math.random().toString(36).substring(2, 15),
                sessionId,
                productId: product.id,
                quantity,
                product,
              },
            ],
          });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [], discountCode: null, discountPercent: 0 }),
      applyDiscount: (code, percent) => set({ discountCode: code, discountPercent: percent }),
      removeDiscount: () => set({ discountCode: null, discountPercent: 0 }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const percent = get().discountPercent;
        return (subtotal * percent) / 100;
      },
      getTotal: () => {
        return get().getSubtotal() - get().getDiscountAmount();
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'dermarokh-cart',
    }
  )
);

// Wishlist store
interface WishlistState {
  items: WishlistItemWithProduct[];
  sessionId: string;
  setItems: (items: WishlistItemWithProduct[]) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      sessionId: generateSessionId(),
      setItems: (items) => set({ items }),
      addItem: (product) => {
        const { items, sessionId } = get();
        if (!items.find((item) => item.productId === product.id)) {
          set({
            items: [
              ...items,
              {
                id: 'wish_' + Math.random().toString(36).substring(2, 15),
                sessionId,
                productId: product.id,
                product,
              },
            ],
          });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },
      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      getItemCount: () => get().items.length,
    }),
    {
      name: 'dermarokh-wishlist',
    }
  )
);

// Search store
interface SearchState {
  query: string;
  isOpen: boolean;
  recentSearches: string[];
  setQuery: (query: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: '',
      isOpen: false,
      recentSearches: [],
      setQuery: (query) => set({ query }),
      setIsOpen: (isOpen) => set({ isOpen }),
      addRecentSearch: (query) => {
        if (!query.trim()) return;
        const recent = get().recentSearches.filter((s) => s !== query);
        set({ recentSearches: [query, ...recent].slice(0, 5) });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'dermarokh-search',
    }
  )
);

// Filter store
interface FilterState {
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  minRating: number;
  sortBy: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';
  skinType: string | null;
  isNew: boolean | null;
  toggleCategory: (categoryId: string) => void;
  toggleBrand: (brandId: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setMinRating: (rating: number) => void;
  setSortBy: (sortBy: FilterState['sortBy']) => void;
  setSkinType: (type: string | null) => void;
  setIsNew: (isNew: boolean | null) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  selectedCategories: [],
  selectedBrands: [],
  priceRange: [0, 10000000],
  minRating: 0,
  sortBy: 'popular',
  skinType: null,
  isNew: null,
  toggleCategory: (categoryId) => {
    const { selectedCategories } = get();
    if (selectedCategories.includes(categoryId)) {
      set({ selectedCategories: selectedCategories.filter((c) => c !== categoryId) });
    } else {
      set({ selectedCategories: [...selectedCategories, categoryId] });
    }
  },
  toggleBrand: (brandId) => {
    const { selectedBrands } = get();
    if (selectedBrands.includes(brandId)) {
      set({ selectedBrands: selectedBrands.filter((b) => b !== brandId) });
    } else {
      set({ selectedBrands: [...selectedBrands, brandId] });
    }
  },
  setPriceRange: (range) => set({ priceRange: range }),
  setMinRating: (rating) => set({ minRating: rating }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSkinType: (type) => set({ skinType: type }),
  setIsNew: (isNew) => set({ isNew }),
  clearFilters: () =>
    set({
      selectedCategories: [],
      selectedBrands: [],
      priceRange: [0, 10000000],
      minRating: 0,
      sortBy: 'popular',
      skinType: null,
      isNew: null,
    }),
}));
