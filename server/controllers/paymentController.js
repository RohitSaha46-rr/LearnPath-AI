// import {razorpay,shortid} from "../config/razorpayConfig.js";
// import Payment from "../models/Payment.js";
// import crypto from "crypto";
// export const createOrder=async(req,res)=>{
//     try {
//         const { amount, currency = 'INR' } = req.body;

//         if (!amount || amount < 1) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Invalid amount',
//             });
//         }

//         const options = {
//             amount: amount * 100, // Razorpay expects amount in paise
//             currency,
//             receipt: shortid.generate(),
//             payment_capture: 1,
//             notes: {
//                 description: 'Test Transaction',
//                 source: 'web'
//             }
//         };

//         console.log('Creating order with options:', { ...options, amount: `${options.amount} paise` });
//         const order = await razorpay.orders.create(options);
//         console.log('Order created successfully:', order.id, 'Status:', order.status);

//         res.status(200).json({
//             success: true,
//             order,
//         });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({
//             success: false,
//             error: error.message || 'Failed to create order',
//         });
//     }
// };
