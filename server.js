const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import Routes
const brandRoutes = require("./routes/brands");
const categoryRoutes = require("./routes/categories");
const customerRoutes = require("./routes/customers");
const employeeRoutes = require("./routes/employees");
const inventoryRoutes = require("./routes/inventory");
const orderRoutes = require("./routes/orders");
const productRoutes = require("./routes/products");
const supplierRoutes = require("./routes/suppliers");
const vendorPartnershipRoutes = require("./routes/vendorPartnerships");
const currencyRoutes = require("./routes/currencies");
const promotionRoutes = require("./routes/promotions");
const orderTaxRoutes = require("./routes/orderTaxes");
const employeeAttendanceRoutes = require("./routes/employeeAttendance");
const customerSupportRoutes = require("./routes/customerSupport");
const paymentRoutes = require("./routes/payments");
const wishlistRoutes = require("./routes/wishlists");
const taxRoutes = require("./routes/taxes");
const orderItemRoutes = require("./routes/orderItems");
const shippingRoutes = require("./routes/shipping");
const reviewRoutes = require("./routes/reviews");
const returnRoutes = require("./routes/returns");
const productPromotionRoutes = require("./routes/productPromotions");
const loyaltyProgramRoutes = require("./routes/loyaltyPrograms");
const giftCardRoutes = require("./routes/giftCards");
const productImageRoutes = require("./routes/productImages");
const giftCardTransactionRoutes = require("./routes/giftCardTransactions");
const discountRoutes = require("./routes/discounts");
const storeLocationRoutes = require("./routes/storeLocations");

// Use Routes
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/vendor-partnerships", vendorPartnershipRoutes);
app.use("/api/currencies", currencyRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/order-taxes", orderTaxRoutes);
app.use("/api/employee-attendance", employeeAttendanceRoutes);
app.use("/api/customer-support", customerSupportRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/taxes", taxRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/product-promotions", productPromotionRoutes);
app.use("/api/loyalty-programs", loyaltyProgramRoutes);
app.use("/api/gift-cards", giftCardRoutes);
app.use("/api/product-images", productImageRoutes);
app.use("/api/gift-card-transactions", giftCardTransactionRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/store-locations", storeLocationRoutes);

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
