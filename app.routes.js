const stripeController = require("../ecommerce-web/stripe.controllers");
const express = require("express");
const router = express.Router();

router.post("/create-checkout-session", stripeController.createPaymentSession);
module.exports = router;