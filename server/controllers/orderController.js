const { Orders } = require("../models/Order");
const { Customers } = require("../models/Customer");

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

    const pipeline = [
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
        $project: {
          count: 1,
          itemsTotal: 1,
          "customer_info.firstName": 1,
          "customer_info.lastName": 1,
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
