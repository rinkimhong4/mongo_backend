// src/controller/index.js
const express = require("express");

const brandRoutes = require("../route/brands");
const categoryRoutes = require("../route/categorys");
const currencyRoutes = require("../route/currencys");
const customerSupportRoutes = require("../route/customer_supports");
const customerRoutes = require("../route/customers");
const discountRoutes = require("../route/discounts");
const employeeAttendanceRoutes = require("../route/employeeattendances");
const employeeRoutes = require("../route/employees");
const giftCardTransactionsRoutes = require("../route/giftCardTransactions");
const giftCardsRoutes = require("../route/giftCards");
const productRoutes = require("../route/products");
const inventoryRoutes = require("../route/inventorys");
const supplierRoutes = require("../route/suppliers");

const router = express.Router();

// API routes mapping
router.use("/brands", brandRoutes);
router.use("/categories", categoryRoutes);
router.use("/currencies", currencyRoutes);
router.use("/support", customerSupportRoutes);
router.use("/customers", customerRoutes);
router.use("/discount", discountRoutes);
router.use("/employeeAttendance", employeeAttendanceRoutes); //error
router.use("/employees", employeeRoutes);
router.use("/giftCardTransactions", giftCardTransactionsRoutes);
router.use("/giftCards", giftCardsRoutes);
router.use("/products", productRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/supplier", supplierRoutes);

module.exports = router;
