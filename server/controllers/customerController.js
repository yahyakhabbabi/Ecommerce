const { Customers } = require('../models/Customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const emailSender = require('../config/emailSender');
const { JWT_SECRET, Refresh_JWT_SECRET } = require('../config/env');
const Customer = require('../models/Customer');

    
exports.login = async function (req, res) {
    const { email, password } = req.body;

    try {
        const customer = await Customers.findOne({ email });

        if (!customer) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!customer.active) {
            return res.status(401).json({ message: "Account is not active" });
        }

        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        customer.last_login = new Date();

        const accessToken = jwt.sign(
            { id: customer._id, email: customer.email },
            JWT_SECRET,
            { expiresIn: '30s' }
        );

        const refreshToken = jwt.sign(
            { id: customer._id, email: customer.email },
            Refresh_JWT_SECRET,
            { expiresIn: '60s' }
        );

        res.status(200).json({
            access_token: accessToken,
            token_type: 'jwt',
            expires_in: 30, 
            refresh_token: refreshToken,
            customer
        });
      
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createCustomer = async function (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingEmail = await Customers.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = new Customers({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const result = await customer.save();

    try {

      const url = `http://localhost:3000/v1/customers/validate/${result.id}`;

      const emailText = `Please click this email to confirm your email: ${url}`;

      emailSender.sendEmail(email, 'confirmation email', emailText);

    } catch (error) {
      res.status(500).send(error);
    }

    if (result) {
      return res.status(201).json({ msg: "Customer created successfully" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.validateCustomer = async function (req,res){
    try{ 
        const {id} = req.params;
        const customer = await Customers.findById(id);
        if(!customer){
            res.status(404).send('customer not found')
        } 
        await customer.updateOne({valid_account:true})
        res.status(201).json('your email is validate avec success');
        
    }catch(error){
        res.status(500).send(error)
    }
    // return res.redirect('http://localhost:3000/v1/customers/login');
};
exports.getAllCustomer = async function (req,res){
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = 10;
        const skip = (page - 1) * limit;
        const sort = req.query.sort || 'Desc'; 
        const sortOrder = sort === 'Desc' ? 1 : -1;
    
        const customer = await Customers.find({})
          .sort({ _id: sortOrder })
          .skip(skip)
          .limit(limit);
         
              res.status(200).send(customer);
            
    
       
    
      } catch (error) {
        console.error(error); 
        res.status(500).send( error.message); 
      }

};
exports.searchCustomer = async function (req,res){
    try {
        const query = req.query.query || "";
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const sort = req.query.sort || 'DESC'; 
        const sortOrder = sort === 'DESC' ? -1 : 1; 
    
        const customers = await Customers.find({
          $or: [
            { firstName: { $regex: query, $options: 'i' } } , 
            { lastName: { $regex: query, $options: 'i' }}, 
            { email: { $regex: query, $options: 'i' } },
          ],
        })
          .sort({ _id: sortOrder }) 
          .limit(limit)
          .skip(skip);
    
        if (customers.length === 0) {
          res.status(404).send("No users found"); 
        } else {
          res.status(200).json(customers); 
        }
      } catch (error) {
          console.error("Error:", error); 
        res.status(500).send(error.message);
      }

};
exports.getCustomerById = async function (req,res){
    const {id}=req.params;
    try{
        const customer =await Customers.findById(id)
        if (customer) {
            res.status(200).send(customer);
          } else {
            res.status(404).json({ message: "User not found" }); 
          }

    }catch(error){
        res.status(500).send(error);
    }

};
exports.updateCustomer = async function (req, res) {
  try {
    const { id } = req.params;
    if (id) {
      const { firstName, lastName, email, active } = req.body;
      const updatedCustomer = await Customers.updateOne({ _id: id }, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        active: active
      });

      if (updatedCustomer.nModified > 0) {
        return res.status(404).send({ error: "User Not Found" });
      } else {
        return res.status(201).send({ msg: "Record updated" });
       
      }
    } else {
      return res.status(400).send({ error: "Invalid ID" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
}

exports.deleteCustomer = async function (req,res){
  try{ 
    const {id} = req.customer;
  const customer = await Customers.findOne({ _id: id });
  
  if (!customer) {
    return res.status(404).send('User not found');
  }

  await customer.deleteOne();

  return res.status(200).send('customer deleted successfully');
     
      }catch(error){
        res.status(500).json(error)
      }

}
exports.customerProfile = async function (req,res){
  try{
    const {id} = req.customer;
    const customer = await Customers.findOne({ _id: id });
  
  if (!customer) {
    return res.status(404).send('User not found');
  }
  res.status(200).send(customer);
  }catch(error){
    res.status(500).json(error)
  }

}
exports.updateDataCustomer = async function (req,res){
  try{
    const { id } = req.customer;
    if (id) {
      const body = req.body;
      const customer = await Customers.findOne({ _id: id });

      if (!customer) {
        return res.status(404).send('User not found');
      }
      const existingEmail=Customers.findOne({ _id: id, email: body.email })   
      if (existingEmail) {
        return res.status(400).send({ error: "Email already exists" });
      }
      await Customers.updateOne({ _id: id }, { $set: body });

      res.status(200).send('User updated successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }

}