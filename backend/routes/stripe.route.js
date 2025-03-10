import express from "express";
import Stripe from "stripe";
const StripeRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

StripeRouter.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default StripeRouter;
