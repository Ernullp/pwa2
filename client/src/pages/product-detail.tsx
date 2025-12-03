import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Share2,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { cn, formatPrice, formatDate } from "@/lib/utils";
import type { Product, Review } from "@shared/schema";

export default function ProductDetailPage() {
  const [, params] = useRoute("/product/:slug");
  const slug = params?.slug;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addItem: addToCart } = useCartStore();
  const { isInWishlist, toggleItem: toggleWishlist } = useWishlistStore();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
    enabled: !!slug,
  });

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: [`/api/products?category=${product?.categoryId}&limit=4`],
    enabled: !!product?.categoryId,
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: [`/api/reviews/${product?.id}`],
    enabled: !!product?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="aspect-square shimmer rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 shimmer rounded" />
              <div className="h-6 w-1/2 shimmer rounded" />
              <div className="h-24 shimmer rounded" />
              <div className="h-12 w-40 shimmer rounded" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">محصول یافت نشد</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.discountPercent && product.discountPercent > 0;
  const originalPrice = product.originalPrice || product.price;
  const images = product.images.length > 0 
    ? product.images 
    : ["https://via.placeholder.com/600x600?text=Product"];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const categoryNames: Record<string, string> = {
    makeup: "آرایشی",
    skincare: "مراقبت پوست",
    haircare: "مراقبت مو",
    fragrance: "عطر و ادکلن",
    "personal-care": "بهداشت شخصی",
    tools: "ابزار و لوازم",
    natural: "محصولات طبیعی",
    bundles: "ست‌ها و بسته‌ها",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <BreadcrumbNav
            items={[
              { label: "محصولات", href: "/products" },
              { label: categoryNames[product.categoryId] || product.categoryId, href: `/category/${product.categoryId}` },
              { label: product.name },
            ]}
          />

          {/* Product Info */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  data-testid="img-product-main"
                />
                {hasDiscount && (
                  <Badge className="absolute top-4 right-4 bg-derma-orange text-white">
                    {product.discountPercent}% تخفیف
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="absolute top-4 left-4 bg-derma-teal text-white">
                    جدید
                  </Badge>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={cn(
                        "w-20 h-20 rounded-md overflow-hidden border-2 shrink-0 transition-colors",
                        selectedImage === idx
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground/30"
                      )}
                      data-testid={`button-thumbnail-${idx}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Brand */}
              <p className="text-sm text-muted-foreground" data-testid="text-brand">
                {product.brandId}
              </p>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-product-name">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-5 w-5",
                        star <= Math.round(product.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount || 0} نظر)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                {hasDiscount && (
                  <span className="text-lg line-through text-muted-foreground">
                    {formatPrice(originalPrice)} تومان
                  </span>
                )}
                <span
                  className={cn(
                    "text-3xl font-bold",
                    hasDiscount ? "text-derma-orange" : "text-foreground"
                  )}
                  data-testid="text-price"
                >
                  {formatPrice(product.price)} تومان
                </span>
              </div>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="text-muted-foreground leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              <Separator />

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <>
                    <Check className="h-5 w-5 text-derma-success" />
                    <span className="text-derma-success font-medium">موجود در انبار</span>
                    {product.stock <= 5 && (
                      <Badge variant="outline" className="text-derma-warning border-derma-warning mr-2">
                        فقط {product.stock} عدد باقی مانده
                      </Badge>
                    )}
                  </>
                ) : (
                  <Badge variant="destructive">ناموجود</Badge>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center gap-2 bg-muted rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= (product.stock || 10)}
                    data-testid="button-increase-quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Add to Cart */}
                <Button
                  size="lg"
                  className="flex-1 bg-derma-orange hover:bg-derma-orange/90"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-5 w-5 ml-2" />
                  افزودن به سبد خرید
                </Button>

                {/* Wishlist */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => toggleWishlist(product)}
                  className={cn(inWishlist && "text-red-500 border-red-500")}
                  data-testid="button-add-to-wishlist"
                >
                  <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
                </Button>

                {/* Share */}
                <Button variant="outline" size="icon" data-testid="button-share">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Separator />

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">ارسال سریع</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-derma-teal" />
                  <p className="text-xs text-muted-foreground">ضمانت اصالت</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <RotateCcw className="h-6 w-6 mx-auto mb-2 text-derma-orange" />
                  <p className="text-xs text-muted-foreground">۷ روز بازگشت</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                توضیحات
              </TabsTrigger>
              <TabsTrigger
                value="specs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                مشخصات
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                نظرات ({reviews?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-6">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="text-foreground leading-relaxed">{product.description}</p>

                {product.benefits && (
                  <>
                    <h3 className="text-lg font-bold mt-6 mb-3">فواید</h3>
                    <p className="text-muted-foreground">{product.benefits}</p>
                  </>
                )}

                {product.howToUse && (
                  <>
                    <h3 className="text-lg font-bold mt-6 mb-3">نحوه استفاده</h3>
                    <p className="text-muted-foreground">{product.howToUse}</p>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specs" className="pt-6">
              <div className="grid gap-4 max-w-lg">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">برند</span>
                  <span className="font-medium">{product.brandId}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">دسته‌بندی</span>
                  <span className="font-medium">{categoryNames[product.categoryId] || product.categoryId}</span>
                </div>
                {product.skinType && (
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-muted-foreground">نوع پوست</span>
                    <span className="font-medium">{product.skinType}</span>
                  </div>
                )}
                {product.ingredients && (
                  <div className="py-3 border-b">
                    <span className="text-muted-foreground block mb-2">ترکیبات</span>
                    <p className="text-sm">{product.ingredients}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              {reviews && reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {review.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{review.userName}</span>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(review.date)}
                              </span>
                            </div>
                            <div className="flex gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={cn(
                                    "h-4 w-4",
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground/30"
                                  )}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    هنوز نظری برای این محصول ثبت نشده است
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <section className="py-8">
              <ProductGrid
                products={relatedProducts.filter((p) => p.id !== product.id).slice(0, 4)}
                title="محصولات مرتبط"
                columns={4}
              />
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
