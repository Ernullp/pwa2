import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  // Brands
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });

  app.get("/api/brands/:slug", async (req, res) => {
    try {
      const brand = await storage.getBrandBySlug(req.params.slug);
      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }
      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brand" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const {
        category,
        brands,
        minPrice,
        maxPrice,
        minRating,
        new: isNew,
        bestseller,
        featured,
        sort,
        limit,
      } = req.query;

      const filters: any = {};

      if (category) filters.category = category as string;
      if (brands) filters.brands = (brands as string).split(",");
      if (minPrice) filters.minPrice = parseFloat(minPrice as string);
      if (maxPrice) filters.maxPrice = parseFloat(maxPrice as string);
      if (minRating) filters.minRating = parseFloat(minRating as string);
      if (isNew === "true") filters.isNew = true;
      if (bestseller === "true") filters.isBestSeller = true;
      if (featured === "true") filters.isFeatured = true;
      if (sort) filters.sort = sort as string;
      if (limit) filters.limit = parseInt(limit as string);

      const products = await storage.getProducts(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.json([]);
      }
      const products = await storage.searchProducts(q as string);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to search products" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Cart
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const items = await storage.getCartItems(req.params.sessionId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const { sessionId, productId, quantity } = req.body;
      if (!sessionId || !productId) {
        return res.status(400).json({ error: "sessionId and productId are required" });
      }
      const item = await storage.addToCart({ sessionId, productId, quantity: quantity || 1 });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (quantity === undefined) {
        return res.status(400).json({ error: "quantity is required" });
      }
      const item = await storage.updateCartQuantity(req.params.id, quantity);
      if (!item) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeFromCart(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart/session/:sessionId", async (req, res) => {
    try {
      await storage.clearCart(req.params.sessionId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // Wishlist
  app.get("/api/wishlist/:sessionId", async (req, res) => {
    try {
      const items = await storage.getWishlistItems(req.params.sessionId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  });

  app.post("/api/wishlist", async (req, res) => {
    try {
      const { sessionId, productId } = req.body;
      if (!sessionId || !productId) {
        return res.status(400).json({ error: "sessionId and productId are required" });
      }
      const item = await storage.addToWishlist({ sessionId, productId });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to wishlist" });
    }
  });

  app.delete("/api/wishlist/:id", async (req, res) => {
    try {
      await storage.removeFromWishlist(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from wishlist" });
    }
  });

  app.get("/api/wishlist/:sessionId/:productId", async (req, res) => {
    try {
      const isIn = await storage.isInWishlist(req.params.sessionId, req.params.productId);
      res.json({ inWishlist: isIn });
    } catch (error) {
      res.status(500).json({ error: "Failed to check wishlist" });
    }
  });

  // Reviews
  app.get("/api/reviews/:productId", async (req, res) => {
    try {
      const reviews = await storage.getProductReviews(req.params.productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const { productId, userName, rating, comment } = req.body;
      if (!productId || !userName || !rating || !comment) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const review = await storage.addReview({
        productId,
        userName,
        rating,
        comment,
        date: new Date().toISOString().split("T")[0],
      });
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to add review" });
    }
  });

  // Discount codes
  app.post("/api/discount/validate", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ error: "code is required" });
      }
      const result = await storage.validateDiscountCode(code);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to validate discount code" });
    }
  });

  return httpServer;
}
