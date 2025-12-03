import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function CartSummary() {
  const { items, updateQuantity, removeItem, getSubtotal, getDiscountAmount, getTotal, discountCode } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">سبد خرید خالی است</h3>
        <p className="text-muted-foreground mb-6">
          محصولات مورد علاقه خود را به سبد خرید اضافه کنید
        </p>
        <Link href="/products">
          <Button data-testid="button-continue-shopping">
            ادامه خرید
          </Button>
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const total = getTotal();
  const shippingCost = total >= 500000 ? 0 : 50000;
  const finalTotal = total + shippingCost;

  return (
    <div className="space-y-4">
      {/* Cart Items */}
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden" data-testid={`cart-item-${item.productId}`}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-20 h-20 rounded-md overflow-hidden bg-muted shrink-0">
                <img
                  src={item.product.images[0] || "https://via.placeholder.com/80x80?text=Product"}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product.slug}`}>
                  <h4 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
                    {item.product.name}
                  </h4>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.product.brandId}
                </p>
                <p className="font-bold text-primary mt-2">
                  {formatPrice(item.product.price)} تومان
                </p>
              </div>

              {/* Quantity & Remove */}
              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => removeItem(item.productId)}
                  data-testid={`button-remove-${item.productId}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2 bg-muted rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    data-testid={`button-decrease-${item.productId}`}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium" data-testid={`text-quantity-${item.productId}`}>
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    data-testid={`button-increase-${item.productId}`}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Separator />

      {/* Summary */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">جمع سبد خرید</span>
          <span>{formatPrice(subtotal)} تومان</span>
        </div>

        {discountCode && discountAmount > 0 && (
          <div className="flex justify-between text-sm text-derma-success">
            <span>تخفیف ({discountCode})</span>
            <span>-{formatPrice(discountAmount)} تومان</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">هزینه ارسال</span>
          <span className={shippingCost === 0 ? "text-derma-success" : ""}>
            {shippingCost === 0 ? "رایگان" : `${formatPrice(shippingCost)} تومان`}
          </span>
        </div>

        {shippingCost > 0 && (
          <p className="text-xs text-muted-foreground">
            با خرید بالای ۵۰۰ هزار تومان، ارسال رایگان خواهد بود
          </p>
        )}

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>مجموع</span>
          <span className="text-primary">{formatPrice(finalTotal)} تومان</span>
        </div>
      </div>
    </div>
  );
}
