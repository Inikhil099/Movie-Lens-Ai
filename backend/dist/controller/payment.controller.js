import { prisma } from "../lib/prisma.js";
import { razorpayInstance } from "../razorpay/razorpay.js";
import crypto from "crypto";
export async function CreateOrder(req, res) {
    // function to create an order 
    try {
        const { TotalPrice } = req.body;
        const options = {
            amount: TotalPrice * 100, // 5 INR for 5 credits
            currency: "INR",
        };
        const razorpayorder = await razorpayInstance.orders.create(options);
        // creating order in db 
        const order = await prisma.payment.create({
            data: {
                userId: req.user.id,
                amount: TotalPrice,
                paymentId: razorpayorder.id,
            },
        });
        return res
            .status(200)
            // return order and razorpay key id to call the callback url and verify the payment
            .json({ ...razorpayorder, key_id: process.env.RAZORPAY_KEY_ID });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Sorry Internal Server Error");
    }
}
export async function VerifyPayment(req, res) {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body || {};
    try {
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ ok: false, error: "Missing fields" });
        }
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const expected = crypto
            .createHmac("sha256", secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");
        if (expected !== razorpay_signature) {
            return res.status(400).json({ ok: false, error: "Bad signature" });
        }
        // updating the user credits by 5 on every purchase
        await prisma.user.update({
            where: { id: req.user.id },
            data: {
                credits: { increment: 5 },
            },
        });
        return res.status(201).json({ msg: "Order Placed Successfully" });
    }
    catch (error) {
        // deletinig the order if the payment is not verified 
        const order = await prisma.payment.delete({
            where: { paymentId: razorpay_payment_id },
        });
        return res.status(500).send("Sorry Internal Server Error");
    }
}
//# sourceMappingURL=payment.controller.js.map