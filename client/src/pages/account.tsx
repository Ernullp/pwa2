import { useState } from "react";
import { Link } from "wouter";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatPrice, formatDate } from "@/lib/utils";

// Demo data
const demoOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    statusLabel: "تحویل داده شده",
    total: 1250000,
    items: 3,
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    status: "processing",
    statusLabel: "در حال پردازش",
    total: 890000,
    items: 2,
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    status: "shipped",
    statusLabel: "ارسال شده",
    total: 2100000,
    items: 5,
  },
];

const demoAddresses = [
  {
    id: "1",
    title: "منزل",
    fullAddress: "تهران، خیابان ولیعصر، کوچه گلستان، پلاک ۱۵، واحد ۳",
    city: "تهران",
    postalCode: "1234567890",
    phone: "09121234567",
    isDefault: true,
  },
  {
    id: "2",
    title: "محل کار",
    fullAddress: "تهران، خیابان شریعتی، ساختمان اداری نور، طبقه ۵",
    city: "تهران",
    postalCode: "1234567891",
    phone: "09121234568",
    isDefault: false,
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const statusColors: Record<string, string> = {
    delivered: "bg-derma-success/10 text-derma-success",
    processing: "bg-derma-orange/10 text-derma-orange",
    shipped: "bg-derma-teal/10 text-derma-teal",
    cancelled: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: "حساب کاربری" }]} />

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        س
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-foreground">سارا محمدی</h3>
                      <p className="text-sm text-muted-foreground">
                        sara@email.com
                      </p>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  {/* Navigation */}
                  <nav className="space-y-2">
                    {[
                      { id: "profile", label: "پروفایل", icon: User },
                      { id: "orders", label: "سفارش‌ها", icon: Package },
                      { id: "addresses", label: "آدرس‌ها", icon: MapPin },
                      { id: "wishlist", label: "علاقه‌مندی‌ها", icon: Heart, href: "/wishlist" },
                      { id: "settings", label: "تنظیمات", icon: Settings },
                    ].map((item) =>
                      item.href ? (
                        <Link key={item.id} href={item.href}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            data-testid={`link-${item.id}`}
                          >
                            <item.icon className="h-4 w-4 ml-3" />
                            {item.label}
                            <ChevronLeft className="h-4 w-4 mr-auto" />
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          key={item.id}
                          variant={activeTab === item.id ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setActiveTab(item.id)}
                          data-testid={`button-${item.id}`}
                        >
                          <item.icon className="h-4 w-4 ml-3" />
                          {item.label}
                        </Button>
                      )
                    )}

                    <Separator className="my-4" />

                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      data-testid="button-logout"
                    >
                      <LogOut className="h-4 w-4 ml-3" />
                      خروج از حساب
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>اطلاعات پروفایل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">نام</Label>
                          <Input
                            id="firstName"
                            defaultValue="سارا"
                            className="mt-1"
                            data-testid="input-first-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">نام خانوادگی</Label>
                          <Input
                            id="lastName"
                            defaultValue="محمدی"
                            className="mt-1"
                            data-testid="input-last-name"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">ایمیل</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="sara@email.com"
                          className="mt-1"
                          data-testid="input-email"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">شماره تلفن</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue="09121234567"
                          className="mt-1"
                          dir="ltr"
                          data-testid="input-phone"
                        />
                      </div>

                      <Button type="submit" data-testid="button-save-profile">
                        ذخیره تغییرات
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {activeTab === "orders" && (
                <Card>
                  <CardHeader>
                    <CardTitle>سفارش‌های من</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {demoOrders.length > 0 ? (
                      <div className="space-y-4">
                        {demoOrders.map((order) => (
                          <Card key={order.id} className="hover-elevate overflow-visible">
                            <CardContent className="p-4">
                              <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="font-medium text-foreground">
                                      {order.id}
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className={statusColors[order.status]}
                                    >
                                      {order.statusLabel}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDate(order.date)} - {order.items} محصول
                                  </p>
                                </div>
                                <div className="text-left">
                                  <p className="font-bold text-primary">
                                    {formatPrice(order.total)} تومان
                                  </p>
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="p-0 h-auto"
                                    data-testid={`button-order-details-${order.id}`}
                                  >
                                    مشاهده جزئیات
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Package className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                        <p className="text-muted-foreground">
                          هنوز سفارشی ثبت نکرده‌اید
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {activeTab === "addresses" && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between gap-4">
                    <CardTitle>آدرس‌های من</CardTitle>
                    <Button size="sm" data-testid="button-add-address">
                      افزودن آدرس جدید
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {demoAddresses.map((address) => (
                        <Card
                          key={address.id}
                          className={
                            address.isDefault
                              ? "border-primary"
                              : ""
                          }
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-medium">{address.title}</span>
                              {address.isDefault && (
                                <Badge variant="secondary">پیش‌فرض</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {address.fullAddress}
                            </p>
                            <p className="text-sm text-muted-foreground mb-4">
                              کد پستی: {address.postalCode} | تلفن: {address.phone}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                data-testid={`button-edit-address-${address.id}`}
                              >
                                ویرایش
                              </Button>
                              {!address.isDefault && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive"
                                  data-testid={`button-delete-address-${address.id}`}
                                >
                                  حذف
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "settings" && (
                <Card>
                  <CardHeader>
                    <CardTitle>تنظیمات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">تغییر رمز عبور</h4>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            className="mt-1"
                            data-testid="input-current-password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">رمز عبور جدید</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            className="mt-1"
                            data-testid="input-new-password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">تکرار رمز عبور جدید</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="mt-1"
                            data-testid="input-confirm-password"
                          />
                        </div>
                        <Button data-testid="button-change-password">
                          تغییر رمز عبور
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-4">اعلان‌ها</h4>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded"
                          />
                          <span className="text-sm">
                            دریافت ایمیل برای تخفیف‌ها و پیشنهادات ویژه
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded"
                          />
                          <span className="text-sm">
                            دریافت پیامک برای وضعیت سفارش
                          </span>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
