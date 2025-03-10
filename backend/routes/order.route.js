import express from "express"
const orderRouter = express.Router();

import {
    createOrderController,
    allOrderUserController,
    cancelOrderController,
    allOrderSellerController,
    changeStatusController
}
from "../controllers/order.controller.js"
import {authMiddleware} from "../middlewares/verifyJwt.middleware.js"
import {sellerAuth} from "../middlewares/sellerVerify.middleware.js"


orderRouter.post("/create-order",authMiddleware,createOrderController);
orderRouter.get("/all-orders",authMiddleware,allOrderUserController);
orderRouter.get("/all-orders-seller",sellerAuth,allOrderSellerController);
orderRouter.put("/update-status/:orderId",sellerAuth,changeStatusController);
orderRouter.delete("/cancel-order/:orderId",authMiddleware,cancelOrderController);


export default orderRouter