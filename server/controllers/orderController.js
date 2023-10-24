const Orders = require('../models/Order')
const { v4: uuidv4 } = require('uuid')


exports.createOrder = async function (req, res) {
    const { customer_id, order_items, cart_total_price } = req.body;
    try {
        const createdOrder = await Orders.create({
            id: uuidv4(),
            customer_id,
            order_items,
            cart_total_price
        })
        res.status(201).send(createdOrder)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.allOrders = async function (req, res) {
    try {
        const page = req.query.page || 1;
        const elementsPerPage = 10;
        const skip = (page - 1) * elementsPerPage;

        // Fetch the orders for the specified page
        const ordersList = await Orders.find().skip(skip).limit(elementsPerPage);

        // Count the number of orders in the fetched list
        const pageOrderCount = ordersList.length;

        res.status(200).json({
            total: pageOrderCount,
            orders: ordersList
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}
exports.orderById = async function (req, res) {
    try {
        const id = req.params.id;
        const findOrderById = await Orders.findOne({ id });

        if (findOrderById) {
            res.status(200).json(findOrderById);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
exports.updateOrder = async function (req, res) {
    const id = req.params.id;
    const {
        customer_id,
        order_items,
        cart_total_price
    } = req.body;

    // Check if any of the required fields are missing
    if (!customer_id || !order_items || !cart_total_price) {
        return res.status(204).json({ message: "customer_id, order_items, and cart_total_price are required fields" });
    }


    try {
        // Update the order
        const updatedOrder = await Orders.findOneAndUpdate(
            { id: id },
            {
                customer_id,
                order_items,
                cart_total_price
            },
            // { new: true }

        );

        if (updatedOrder) {
            res.status(200).json({ message: "Order updated successfully", data: updatedOrder });
        } else {
            res.status(404).json({ message: "invalid order id" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};