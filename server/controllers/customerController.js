const { Customers } = require("../models/Customer");
const { Orders } = require("../models/Order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailSender = require("../config/emailSender");
const {
  JWT_SECRET_customer,
  Refresh_JWT_SECRET_customer,
} = require("../config/env");
const crypto = require("crypto");
const path = require('path');

exports.login = async function (req, res, next) {
  console.log("m in login");
  const { email, password } = req.body;

  try {
    const customer = await Customers.findOne({ email });

    if (!customer) {
      const error = new Error("customer not found");
      error.statusCode = 404;
      throw error;
    }
    if (!customer.valid_account) {
      const error = new Error("you should validate your email first");
      error.statusCode = 400;
      throw error;
    }

    if (!customer.active) {
      const error = new Error("Account is not active");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) {
      const error = new Error("wrong password");
      error.statusCode = 401;
      throw error;
    }

    customer.last_login = new Date();

    const accessToken = jwt.sign(
      {
        id: customer._id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        customer_image: customer.customer_image,
        type: "customer",
      },
      JWT_SECRET_customer,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      {
        id: customer._id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        customer_image: customer.customer_image,
        type: "customer",
      },
      Refresh_JWT_SECRET_customer,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      access_token: accessToken,
      token_type: "jwt",
      expires_in: 30,
      refresh_token: refreshToken,
      customer,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.validateCustomer = async function (req, res, next) {
  try {
    const { id } = req.params;
    const customer = await Customers.findById(id);

    if (!customer) {
      const error = new Error("customer not found");
      error.statusCode = 404;
      throw error;
    }
    if (customer.valid_account) {
      const error = new Error("email already validate");
      error.statusCode = 400;
      throw error;
    }

    await customer.updateOne({ valid_account: true });
    return res.redirect("http://localhost:3001/login");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.createCustomer = async function (req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingEmail = await Customers.findOne({ email });

    if (existingEmail) {
      const error = new Error("Email already exists");
      error.statusCode = 403;
      throw error;
    }

    if (!password) {
      const error = new Error("Password is required");
      error.statusCode = 401;
      throw error;
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

      const emailText = `Hi ${customer.firstName},
      
      Welcome to Xticket! We're thrilled to have you on board. Before you dive into all the exciting features and benefits, we just need to verify your email address to ensure the security of your account.
    
      Please click on the following link to activate your account : ${url}
      Thank you for choosing [Your Company]. We can't wait for you to explore all that awaits you!
      
      Best regards,
      
      Xticket`;

      emailSender.sendEmail(email, "Activate Your Account - Email Verification", emailText);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }

    if (result) {
      return res
        .status(201)
        .json({ msg: "Customer created successfully", result });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllCustomer = async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "Desc";
    const sortOrder = sort === "Desc" ? 1 : -1;

    const customer = await Customers.find({})
      .sort({ _id: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(200).json(customer);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.searchCustomer = async function (req, res, next) {
  try {
    const query = req.query.query || "";
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "DESC";
    const sortOrder = sort === "DESC" ? -1 : 1;

    const customers = await Customers.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ _id: sortOrder })
      .limit(limit)
      .skip(skip);

    if (customers.length === 0) {
      const error = new Error("No customers found");
      error.statusCode = 404;
      throw error;
    } else {
      res.status(200).json(customers);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getCustomerById = async function (req, res, next) {
  const { id } = req.params;
  try {
    const customer = await Customers.findById(id);
    if (customer) {
      res.status(200).send(customer);
    } else {
      const error = new Error("customer not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateCustomer = async function (req, res, next) {
  try {
    const { id } = req.params;
    if (id) {
      const { firstName, lastName, email, active } = req.body;
      const updatedCustomer = await Customers.updateOne(
        { _id: id },
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          active: active,
        }
      );

      if (updatedCustomer.nModified > 0) {
        const error = new Error("customer not found");
        error.statusCode = 404;
        throw error;
      } else {
        return res.status(201).send({ msg: "Record updated" });
      }
    } else {
      const error = new Error("Invalid ID");
      error.statusCode = 404;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.deleteCustomer = async function (req, res, next) {
  try {
    const { id } = req.customer;
    const customer = await Customers.findOne({ _id: id });

    if (!customer) {
      const error = new Error("customer not found");
      error.statusCode = 404;
      throw error;
    }
    await Orders.deleteMany({ customer_id: id });
    await customer.deleteOne();

    return res.status(200).send("customer and his orders deleted successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.customerProfile = async function (req, res, next) {
  try {
    const { id } = req.customer;
    const customer = await Customers.findOne({ _id: id });

    if (!customer) {
      const error = new Error("customer not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).send(customer);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateDataCustomer = async function (req, res, next) {
  try {
    const { id } = req.customer;

    if (!id) {
      const error = new Error("Customer not found");
      error.statusCode = 400;
      throw error;
    }

    const body = req.body;
    

    // Fetch the existing customer
    const customer = await Customers.findOne({ _id: id });

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }

    // Check if the provided email already exists for another customer
    const existingEmail = await Customers.findOne({
      _id: { $ne: id },
      email: body.email,
    });

    if (existingEmail) {
      const error = new Error("Email already exists");
      error.statusCode = 400;
      throw error;
    }

    // Update customer data, including the image path
    const updateData = { ...body,_id: id };

    // Update the customer document
    await Customers.updateOne({ _id: id }, { $set: updateData });

    res.status(200).json("User updated successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.refresh = async function (req, res) {
  const refreshToken = req.body.refresh_token;
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json("You are not authenticated");
  }

  jwt.verify(refreshToken, Refresh_JWT_SECRET_customer, (err, decoded) => {
    if (err) {
      return res.status(403).json("Refresh token is not valid!");
    }

    const accessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        customer_image: decoded.customer_image,
        type: "customer",
      },
      JWT_SECRET_customer,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token: {
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: "10s",
      },
    });
  });
};

exports.updatePassword = async function (req, res, next) {
  try {
    const { id } = req.customer;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    
    const customer = await Customers.findById(id);

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(currentPassword, customer.password);

    if (!isMatch) {
      const error = new Error("Password incorrect");
      error.statusCode = 401;
      throw error;
    }

    if (newPassword !== confirmNewPassword) {
      const error = new Error("New passwords do not match");
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    customer.password = hashedPassword;
    await customer.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.forgetPassword = async function (req, res, next) {
  try {
    const customer = await Customers.findOne({ email: req.body.email });
    if (!customer) {
      return res.status(404).send({
        message:
          "Oops! It seems like there's no account associated with the provided email address. Please make sure it's spelled correctly or consider signing up to join our awesome community!",
      });
    }
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token)
   
    customer.passwordResetToken= token,
    customer.passwordResetExpires = Date.now() + (60 * 1000 * 10);
      await customer.save()
    const url = `http://localhost:3001/resetpassword/${token}`;

    const emailText = `Hello ${customer.firstName},
    
    We hope this message finds you well. It seems like you've requested to reset your password for your Xticket account.
    
    To reset your password, simply click on the following link:${url}

    
    If you didn't request this password reset, please ignore this email. Your account is secure, and no action is required.
    
    If you continue to experience issues or have any questions, feel free to reach out to our support team at xticket.serviceclient@gmail.com.
    
    Thank you for being a part of our community!
    
    Best regards,
    Xticket Team`;

    emailSender.sendEmail(customer.email, "Reset Your Password - Xticket", emailText);

    res.status(200).send({ message: "Password reset email sent! Please check your inbox!" });
  } catch (error) {
    res.status(500).send({ message: "Something wrong! Please try again." });
  }
};
exports.verifytoken = async function (req,res,next ) {
  
  const {token } = req.params;

  const customer = await Customers.findOne({passwordResetToken:token})


  if (!customer){
    return res.status(200).send({status:"error",message:'Customer not found'})
  }
  if(customer.passwordResetExpires  - Date.now() < 0 ) {
    res.status(200).send({status:"error",message:"token has expired"})
  }

  res.status(200).send({status:"success",message:"token valid"})

}
exports.resetPassword = async function (req, res, next) {
  const {token } = req.params;
  const {newPassword,confirmNewPassword} = req.body;

  const customer = await Customers.findOne({passwordResetToken:token})

  if (!customer){
     res.status(200).send({status:"error",message:'Customer not found'})
    return 
  }

  if(customer.passwordResetExpires  - Date.now() < 0 ) {
     res.status(200).send({status:"error",message:"token has expired"})
     return 
  }

  
  if(newPassword != confirmNewPassword){
     res.status(200).send({status:"error",message : 'Password must match confirm Password' })
     console.log('inside')
     return 
    }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  customer.password = hashedPassword;
  customer.passwordResetExpires = Date.now() - (60 * 1000 * 10)
  await customer.save();

  res.status(200).json({status:"success", message:"the new password has been set succesfully " });
}


// exports.updateCustomerImage = async function (req, res, next) {
//   console.log(req.file);

//     // All good
//     res.sendStatus(200); 
// }
exports.updateCustomerImage = async function (req, res, next) {
  try {
    const { id } = req.customer;
    const customer_image = req.file ? req.file.path : null;
    const customer = await Customers.findOne({ _id: id });

    if (!customer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }

    // Update the customer document
    await Customers.findByIdAndUpdate(id, { customer_image });
console.log("hi")
    res.status(200).json("Profile image updated successfully");
  } catch (err) {
    if (!err.statusCode) {
      const error = new Error("Something went wrong try again");
      err.statusCode = 500;
    }
    next(err);
  }
};