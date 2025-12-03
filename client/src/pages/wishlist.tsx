import { Link } from "wouter";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useWishlistStore, useCartStore } from "@/lib/store";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      addToCart(item.product);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: "علاقه‌مندی‌ها" }]} />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                علاقه‌مندی‌ها
              </h1>
              <p className="text-muted-foreground mt-1">
                {items.length} محصول در لیست علاقه‌مندی‌ها
              </p>
            </div>

            {items.length > 0 && (
              <Button onClick={handleAddAllToCart} data-testid="button-add-all-to-cart">
                <ShoppingCart className="h-4 w-4 ml-2" />
                افزودن همه به سبد خرید
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-20 w-20 mx-auto text-muted-foreground/30 mb-6" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                لیست علاقه‌مندی‌ها خالی است
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                محصولات مورد علاقه خود را با کلیک روی آیکون قلب به لیست اضافه کنید
              </p>
              <Link href="/products">
                <Button data-testid="button-browse-products">
                  مشاهده محصولات
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <ProductCard key={item.id} product={item.product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
