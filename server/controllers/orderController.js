const {Orders} = require('../models/Order')
const { Customers } = require('../models/Customer');

exports.createOrder = async function(req,res){
    try{
        const {customer_id,order_items,cart_total_price}=req.body;
        const customer = await Customers.findById(customer_id);

        if (!customer || !customer.valid_account) {
            return res.status(403).json({ error: "Customer's email is not validated. Order creation not allowed." });
        }
        const order = new Orders({
            customer_id,
            order_items,
            cart_total_price
        })
        const result =await order.save();
        if(result){
            res.status(201).json("order created successfully")
        }else {
            return res.status(403).send({ error: "you don't have enough privilege" });
        }
    }catch(error){
        res.status(500).json(error);
    }
  
    
}
exports.allOrders = async function(req,res){
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
    
        const pipeline = [
          {
            $lookup: {
              from: 'customers', 
              localField: 'customer_id',
              foreignField: '_id',
              as: 'customer_info',
            },
          },
          {
            $unwind: '$customer_info',
          },
          {
            $project: {
              count: 1,
              itemsTotal: 1,
              'customer_info.firstName': 1,
              'customer_info.lastName': 1,
            },
          },
          {
            $facet: {
              orders: [
                { $skip: skip },
                { $limit: limit },
              ],
              totalCount: [
                { $group: { _id: null, count: { $sum: 1 } } },
              ],
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
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
exports.orderById = async function(req,res){
    try {
        const orderId = req.params.id;
    
        const order = await Orders.findById(orderId).populate('customer_id', 'firstName lastName');
    
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
    
        res.status(201).json(order);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }

exports.updateOrder = async function(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const order = await Orders.findById(id);
    
            if (!order) {
                return res.status(404).json('Order not found');
            }
    
            const result = await order.updateOne({ status: status });
    
            if (result) {
                return res.status(201).json('Order updated successfully');
            } else {
                return res.status(500).json('Failed to update order');
            }
    
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    