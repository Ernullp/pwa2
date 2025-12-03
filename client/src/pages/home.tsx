import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroBanner } from "@/components/hero-banner";
import { CategoryGrid } from "@/components/category-card";
import { BestSellers, NewArrivals } from "@/components/product-grid";
import { BrandShowcase } from "@/components/brand-showcase";
import { Testimonials } from "@/components/testimonials";
import type { Product, Brand } from "@shared/schema";

export default function Home() {
  const { data: bestSellers, isLoading: loadingBestSellers } = useQuery<Product[]>({
    queryKey: ["/api/products?bestseller=true&limit=8"],
  });

  const { data: newProducts, isLoading: loadingNew } = useQuery<Product[]>({
    queryKey: ["/api/products?new=true&limit=8"],
  });

  const { data: brands, isLoading: loadingBrands } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner />

        {/* Categories */}
        <CategoryGrid />

        {/* Best Sellers */}
        <section className="py-8 bg-background">
          <BestSellers 
            products={bestSellers || []} 
            isLoading={loadingBestSellers} 
          />
        </section>

        {/* Brands */}
        <BrandShowcase brands={brands || []} isLoading={loadingBrands} />

        {/* New Arrivals */}
        <section className="py-8 bg-muted/30">
          <NewArrivals 
            products={newProducts || []} 
            isLoading={loadingNew} 
          />
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Features Banner */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">ارسال سریع</h3>
                <p className="text-sm text-muted-foreground">
                  ارسال به سراسر ایران در کمترین زمان ممکن
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-derma-teal/10 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">تضمین اصالت</h3>
                <p className="text-sm text-muted-foreground">
                  تمامی محصولات ۱۰۰٪ اصل و با گارانتی
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-derma-orange/10 flex items-center justify-center">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">پرداخت امن</h3>
                <p className="text-sm text-muted-foreground">
                  پرداخت ایمن با درگاه‌های معتبر بانکی
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
