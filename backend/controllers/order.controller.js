import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Book from "../models/books.model.js";

const createOrderController = async (req, res) => {
    try {
        const { userId } = req.user; 
        const { books } = req.body;

        // Validate required fields
        if (!userId || !books || books.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const orders = [];
        const errors = [];

        for (const bookId of books) {
            try {
                const book = await Book.findById(bookId);
                if (!book) {
                    errors.push(`Book with ID ${bookId} not found`);
                    continue; 
                }
                const newOrder = new Order({
                    user: userId,
                    book: bookId,
                    seller: book.seller,
                    status: "Pending",
                    statusMessage: "Payment received, order is pending",
                });

                const savedOrder = await newOrder.save();
                console.log("hello")
                orders.push(savedOrder);
            } catch (err) {
                errors.push(`Error processing book ID ${bookId}: ${err.message}`);
            }
        }

        if (orders.length === 0) {
            return res.status(400).json({ message: "No valid orders could be created", errors });
        }

        res.status(201).json({ message: "Order created successfully", orders, errors });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const allOrderUserController = async(req,res) =>{
    try {
        const {userId} = req.user;
        if(!userId){
            return res.status(400).json({message: "Missing required fields"})
        }
        const orders = await Order.find({user:userId}).populate('book').populate('seller');
        if(!orders){
            return res.status(404).json({message: "No orders found"})
        }
        res.status(200).json({orders})
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
}

const cancelOrderController = async(req,res) =>{
    try {
        const {userId} = req.user;
        const {orderId} = req.params;
        if(!userId || !orderId){
            return res.status(400).json({message: "Missing required fields"})
        }
        const order = await Order.findById(orderId).populate('book').populate('seller');
        if(!order){
            return res.status(404).json({message: "Order not found"})
        }
        if(order.status === "cancelled"){
            return res.status(400).json({message: "Order is already cancelled"})
        }
        order.status = "Cancelled";
        await order.save();
        res.status(200).json({message: "Order cancelled successfully"})

        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
 
    }
}

const allOrderSellerController = async(req,res) =>{
    try {
        const sellerId = req.seller.id;
        const orders = await Order.find({seller:sellerId}).populate('book').populate('user');
        if(!orders){
            return res.status(404).json({message: "No orders found"})
        }
        res.status(200).json({orders})
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
}

const changeStatusController = async(req,res) =>{
    try {
        const sellerId = req.seller.id;
        const {orderId} = req.params;
        const {status, statusMessage} = req.body;
        if(!sellerId || !orderId){
            return res.status(400).json({message: "Missing required fields"})
        }
        const order = await Order.findById(orderId).populate('book').populate('seller');
        if(!order){
            return res.status(404).json({message: "Order not found"})
        }
        if(order.status === status){
            return res.status(400).json({message: "Order is already in this status"})
        }
        order.status = status;
        order.statusMessage = statusMessage;
        await order.save();
        res.status(200).json({message: "Order status changed successfully"})

        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export { createOrderController , allOrderUserController , cancelOrderController , allOrderSellerController , changeStatusController};
