const { Orders } = require("../models/Order");
const { Customers } = require("../models/Customer");
const mongoose = require('mongoose')

exports.createOrder = async function (req, res, next) {
  try {
    const { order_items, cart_total_price } = req.body;
    const customer_id = req.customer.id;
    console.log(customer_id)
    const customer = await Customers.findById(customer_id);
   
    if (!customer || !customer.valid_account) {
      const error = new Error(
        "Customer's email is not validated. Order creation not allowed."
      );
      error.statusCode = 403;
      throw error;
    }
    const order = new Orders({
      customer_id,
      order_items,
      cart_total_price,
      order_date: Date.now(),
    });
    const result = await order.save();
    if (result) {
      res.status(201).json("order created successfully");
    } else {
      const error = new Error("you don't have enough privilege");
      error.statusCode = 403;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.allOrders = async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    let filterObject = {};
    if (req.params.customerId)
      filterObject = {
        customer_id: new mongoose.Types.ObjectId(req.params.customerId),
      };

    const pipeline = [
      {
        $match: filterObject,
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer_info",
        },
      },
      {
        $unwind: "$customer_info",
      },
      {
        $addFields: {
          firstName: "$customer_info.firstName",
          lastName: "$customer_info.lastName",
        },
      },
      {
        $project: {
          count: 1,
          itemsTotal: 1,
          order_items:1,
          cart_total_price:1,
          status:1,
          order_date:1,
          firstName: 1,
          lastName: 1,
        },
      },
      {
        $facet: {
          orders: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
    ];

    const results = await Orders.aggregate(pipeline);

    const orders = results[0].orders;
    const totalCount = results[0].totalCount[0].count;

    res.json({
      orders,
      totalCount,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.orderById = async function (req, res, next) {
  try {
    const orderId = req.params.id;

    const order = await Orders.findById(orderId).populate(
      "customer_id",
      "firstName lastName"
    );

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json(order);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateOrder = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Orders.findById(id);

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    const result = await order.updateOne({ status: status });

    if (result) {
      return res.status(201).json("Order updated successfully");
    } else {
      return res.status(500).json("Failed to update order");
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateOrderItem = async function (req, res, next) {
  try {
    const { id, itemId } = req.params;
    const { order } = req.body;

    const orderToUpdate = await Orders.findById(id);
    if (!orderToUpdate) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    const orderItemToUpdate = orderToUpdate.order_items.find(item => item.id === itemId);
    if (!orderItemToUpdate) {
      const error = new Error("Order item not found");
      error.statusCode = 404;
      throw error;
    }

    console.log('Current order_item:', orderItemToUpdate);
    console.log('Order to update:', order);

    // Check if the order item is already verified
    if (orderItemToUpdate.order === 'verified') {
      const error = new Error("Order item is already verified");
      error.statusCode = 400;
      throw error;
    }

    // If the order is 'open', update it to 'verified'
    if (orderItemToUpdate.order === 'open') {
      orderItemToUpdate.order = 'verified';
    }

    // Save the updated order
    const savedOrder = await orderToUpdate.save();

    console.log('Order item updated:', savedOrder.order_items.find(item => item.id === itemId));

    return res.status(200).json("Order item updated successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};





