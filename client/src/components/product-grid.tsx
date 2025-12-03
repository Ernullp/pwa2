import { ProductCard, ProductCardSkeleton } from "./product-card";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
}

export function ProductGrid({
  products,
  isLoading = false,
  title,
  subtitle,
  emptyMessage = "محصولی یافت نشد",
  columns = 4,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <section className="py-8">
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      {isLoading ? (
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-lg text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </section>
  );
}

// Featured products section with title
interface FeaturedProductsProps {
  products: Product[];
  isLoading?: boolean;
}

export function BestSellers({ products, isLoading }: FeaturedProductsProps) {
  return (
    <div className="container mx-auto px-4">
      <ProductGrid
        products={products}
        isLoading={isLoading}
        title="پرفروش‌ترین محصولات"
        subtitle="محبوب‌ترین انتخاب‌های مشتریان ما"
      />
    </div>
  );
}

export function NewArrivals({ products, isLoading }: FeaturedProductsProps) {
  return (
    <div className="container mx-auto px-4">
      <ProductGrid
        products={products}
        isLoading={isLoading}
        title="جدیدترین محصولات"
        subtitle="تازه‌ترین محصولات اضافه شده به فروشگاه"
      />
    </div>
  );
}

export function FeaturedProducts({ products, isLoading }: FeaturedProductsProps) {
  return (
    <div className="container mx-auto px-4">
      <ProductGrid
        products={products}
        isLoading={isLoading}
        title="محصولات ویژه"
        subtitle="محصولات منتخب با بهترین کیفیت"
      />
    </div>
  );
}
