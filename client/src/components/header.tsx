import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { useCartStore, useWishlistStore, useSearchStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const categories = [
  { id: "makeup", name: "آرایشی", href: "/category/makeup" },
  { id: "skincare", name: "مراقبت پوست", href: "/category/skincare" },
  { id: "haircare", name: "مراقبت مو", href: "/category/haircare" },
  { id: "fragrance", name: "عطر و ادکلن", href: "/category/fragrance" },
  { id: "personal-care", name: "بهداشت شخصی", href: "/category/personal-care" },
  { id: "tools", name: "ابزار و لوازم", href: "/category/tools" },
  { id: "natural", name: "محصولات طبیعی", href: "/category/natural" },
  { id: "bundles", name: "ست‌ها و بسته‌ها", href: "/category/bundles" },
];

export function Header() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { query, setQuery, addRecentSearch } = useSearchStore();
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const wishlistItemCount = useWishlistStore((state) => state.getItemCount());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query);
      setLocation(`/search?q=${encodeURIComponent(query)}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      {/* Top bar with promo */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <span>ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان</span>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">منوی موبایل</SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <span className="text-xl font-bold text-primary">درمارُخ</span>
                </Link>
                <nav className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={cat.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span
                        className={cn(
                          "block py-2 px-3 rounded-md hover-elevate",
                          location === cat.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground"
                        )}
                        data-testid={`link-mobile-category-${cat.id}`}
                      >
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2" data-testid="link-home">
              <span className="text-2xl font-bold bg-gradient-to-l from-primary to-derma-teal bg-clip-text text-transparent">
                درمارُخ
              </span>
              <span className="hidden sm:inline text-xs text-muted-foreground">
                DermaRokh
              </span>
            </div>
          </Link>

          {/* Desktop search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="جستجوی محصولات..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-10 w-full"
                data-testid="input-search"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile search toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
              data-testid="button-search-toggle"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            <ThemeToggle />

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                data-testid="button-wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -left-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {wishlistItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                data-testid="button-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -left-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-derma-orange text-white"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Account */}
            <Link href="/account">
              <Button variant="ghost" size="icon" data-testid="button-account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="md:hidden pb-4 animate-fade-in"
          >
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="جستجوی محصولات..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-10 w-full"
                autoFocus
                data-testid="input-search-mobile"
              />
            </div>
          </form>
        )}
      </div>

      {/* Desktop navigation */}
      <nav className="hidden lg:block border-t border-border/50 bg-card/50">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={cat.href}>
                  <span
                    className={cn(
                      "block py-3 px-4 text-sm font-medium transition-colors hover-elevate rounded-md",
                      location === cat.href
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground"
                    )}
                    data-testid={`link-category-${cat.id}`}
                  >
                    {cat.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
