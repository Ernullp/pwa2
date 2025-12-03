import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem: addToCart } = useCartStore();
  const { isInWishlist, toggleItem: toggleWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const hasDiscount = product.discountPercent && product.discountPercent > 0;
  const originalPrice = product.originalPrice || product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Card
      className={cn(
        "group relative overflow-visible transition-all duration-300 hover-elevate",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-md bg-muted">
          {/* Product Image */}
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer" />
          )}
          <img
            src={product.images[0] || "https://via.placeholder.com/400x400?text=Product"}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              isHovered && "scale-105",
              !imageLoaded && "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {hasDiscount && (
              <Badge className="bg-derma-orange text-white">
                {product.discountPercent}% تخفیف
              </Badge>
            )}
            {product.isNew && (
              <Badge variant="secondary" className="bg-derma-teal text-white">
                جدید
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="destructive">ناموجود</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 left-2 bg-background/80 backdrop-blur-sm",
              inWishlist && "text-red-500"
            )}
            onClick={handleToggleWishlist}
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-all",
                inWishlist && "fill-current animate-heart-beat"
              )}
            />
          </Button>

          {/* Quick Actions */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    className="flex-1 bg-primary"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    data-testid={`button-add-to-cart-${product.id}`}
                  >
                    <ShoppingCart className="h-4 w-4 ml-1" />
                    افزودن
                  </Button>
                </TooltipTrigger>
                <TooltipContent>افزودن به سبد خرید</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    data-testid={`button-quick-view-${product.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>مشاهده سریع</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <CardContent className="p-3">
          {/* Brand */}
          <p className="text-xs text-muted-foreground mb-1" data-testid={`text-brand-${product.id}`}>
            {product.brandId}
          </p>

          {/* Title */}
          <h3
            className="font-medium text-sm line-clamp-2 mb-2 min-h-[2.5rem]"
            data-testid={`text-title-${product.id}`}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3 w-3",
                    star <= Math.round(product.rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-xs line-through text-muted-foreground">
                  {formatPrice(originalPrice)}
                </span>
              )}
              <span
                className={cn(
                  "font-bold",
                  hasDiscount ? "text-derma-orange" : "text-foreground"
                )}
                data-testid={`text-price-${product.id}`}
              >
                {formatPrice(product.price)} تومان
              </span>
            </div>
            {product.stock > 0 && product.stock <= 5 && (
              <Badge variant="outline" className="text-xs text-derma-warning border-derma-warning">
                فقط {product.stock} عدد
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

// Skeleton for loading state
export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square shimmer" />
      <CardContent className="p-3">
        <div className="h-3 w-16 shimmer rounded mb-2" />
        <div className="h-4 w-full shimmer rounded mb-1" />
        <div className="h-4 w-3/4 shimmer rounded mb-2" />
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-3 w-3 shimmer rounded-full" />
          ))}
        </div>
        <div className="h-5 w-24 shimmer rounded" />
      </CardContent>
    </Card>
  );
}
