// src/controller/index.js
const express = require("express");

const brandRoutes = require("../controllers/brands");
const categoryRoutes = require("../controllers/categorys");
const currencyRoutes = require("../controllers/currencys");
const customerSupportRoutes = require("../controllers/customer_supports");
const customerRoutes = require("../controllers/customers");
const discountRoutes = require("../controllers/discounts");
const employeeAttendanceRoutes = require("../controllers/employeeattendances");
const employeeRoutes = require("../controllers/employees");
const giftCardTransactionsRoutes = require("../controllers/giftCardTransactions");
const giftCardsRoutes = require("../controllers/giftCards");
const productRoutes = require("../controllers/products");
const inventoryRoutes = require("../controllers/inventorys");
const supplierRoutes = require("../controllers/suppliers");
const wishlistRoutes = require("../controllers/wishlists");
const vendorPartnershipRoutes = require("../controllers/vendorPartnerships");
const taxRoutes = require("../controllers/taxs");
const storeLocationRoutes = require("../controllers/storeLocations");
const ordersRoutes = require("../controllers/orders");
const shippingRoutes = require("../controllers/shippings");
const reviewRoutes = require("../controllers/reviews");
const returnRoutes = require("../controllers/returns");
const loyaltyProgramRoutes = require("../controllers/loyaltyPrograms");
const orderItemRoutes = require("../controllers/orderItems");
const orderTaxRoutes = require("../controllers/orderTaxs");
const paymentRoutes = require("../controllers/payments");
const productImageRoutes = require("../controllers/productImages");
const productPromotionRoutes = require("../controllers/productPromotions");
const promotionRoutes = require("../controllers/promotions");

const router = express.Router();

/// API routes mapping
router.use("/brands", brandRoutes);
router.use("/categories", categoryRoutes);
router.use("/currencies", currencyRoutes);
router.use("/support", customerSupportRoutes);
router.use("/customers", customerRoutes);
router.use("/discount", discountRoutes);
router.use("/employeeAttendance", employeeAttendanceRoutes);
router.use("/employees", employeeRoutes);
router.use("/giftCardTransactions", giftCardTransactionsRoutes);
router.use("/giftCards", giftCardsRoutes);
router.use("/products", productRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/supplier", supplierRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/vendorPartnership", vendorPartnershipRoutes);
router.use("/tax", taxRoutes);
router.use("/storeLocations", storeLocationRoutes);
router.use("/orders", ordersRoutes);
router.use("/shippings", shippingRoutes);
router.use("/reviews", reviewRoutes);
router.use("/returns", returnRoutes);
router.use("/loyaltyPrograms", loyaltyProgramRoutes);
router.use("/orderItems", orderItemRoutes);
router.use("/orderTaxs", orderTaxRoutes);
router.use("/payments", paymentRoutes);
router.use("/productImages", productImageRoutes);
router.use("/productPromotions", productPromotionRoutes);
router.use("/promotions", promotionRoutes);

module.exports = router;
