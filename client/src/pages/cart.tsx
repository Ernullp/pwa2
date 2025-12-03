import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Tag, Trash2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { CartSummary } from "@/components/cart-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const [discountInput, setDiscountInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  const {
    items,
    discountCode,
    applyDiscount,
    removeDiscount,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    clearCart,
  } = useCartStore();

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const total = getTotal();
  const shippingCost = total >= 500000 ? 0 : 50000;
  const finalTotal = total + shippingCost;

  const handleApplyDiscount = async () => {
    if (!discountInput.trim()) return;

    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo discount codes
      const codes: Record<string, number> = {
        DERMA10: 10,
        DERMA20: 20,
        WELCOME: 15,
      };

      const percent = codes[discountInput.toUpperCase()];
      
      if (percent) {
        applyDiscount(discountInput.toUpperCase(), percent);
        toast({
          title: "کد تخفیف اعمال شد",
          description: `${percent}% تخفیف به سفارش شما اضافه شد`,
        });
        setDiscountInput("");
      } else {
        toast({
          title: "کد تخفیف نامعتبر",
          description: "لطفاً کد تخفیف صحیح را وارد کنید",
          variant: "destructive",
        });
      }
      setIsApplying(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: "سبد خرید" }]} />

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            سبد خرید
          </h1>

          {items.length === 0 ? (
            <CartSummary />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-4">
                    <CardTitle>محصولات ({items.length})</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={clearCart}
                      data-testid="button-clear-cart"
                    >
                      <Trash2 className="h-4 w-4 ml-2" />
                      حذف همه
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <CartSummary />
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>خلاصه سفارش</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Discount Code */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        کد تخفیف
                      </label>
                      {discountCode ? (
                        <div className="flex items-center justify-between p-3 bg-derma-success/10 rounded-md">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-derma-success" />
                            <span className="font-medium text-derma-success">
                              {discountCode}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={removeDiscount}
                            data-testid="button-remove-discount"
                          >
                            حذف
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            placeholder="کد تخفیف را وارد کنید"
                            value={discountInput}
                            onChange={(e) => setDiscountInput(e.target.value)}
                            data-testid="input-discount-code"
                          />
                          <Button
                            onClick={handleApplyDiscount}
                            disabled={isApplying || !discountInput.trim()}
                            data-testid="button-apply-discount"
                          >
                            اعمال
                          </Button>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Summary */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">جمع سبد خرید</span>
                        <span>{formatPrice(subtotal)} تومان</span>
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between text-sm text-derma-success">
                          <span>تخفیف</span>
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
                        <span>مجموع قابل پرداخت</span>
                        <span className="text-primary">{formatPrice(finalTotal)} تومان</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Link href="/checkout">
                      <Button
                        className="w-full bg-derma-orange hover:bg-derma-orange/90"
                        size="lg"
                        data-testid="button-checkout"
                      >
                        ادامه فرآیند خرید
                        <ArrowRight className="h-4 w-4 mr-2" />
                      </Button>
                    </Link>

                    {/* Continue Shopping */}
                    <Link href="/products">
                      <Button variant="outline" className="w-full" data-testid="button-continue-shopping">
                        ادامه خرید
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
