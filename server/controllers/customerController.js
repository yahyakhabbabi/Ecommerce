const { Customers } = require("../models/Customer");
const { Orders } = require("../models/Order");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailSender = require("../config/emailSender");
const { JWT_SECRET_customer, Refresh_JWT_SECRET_customer } = require("../config/env");

exports.login = async function (req, res, next) {
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
      { id: customer._id, email: customer.email, type: "customer" },
      JWT_SECRET_customer,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: customer._id, email: customer.email, type: "customer" },
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

      const emailText = `Please click this email to confirm your email: ${url}`;

      emailSender.sendEmail(email, "confirmation email", emailText);
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
    res.status(201).json("your email is validate avec success");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  // return res.redirect('http://localhost:3000/v1/customers/login');
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
exports.deleteCustomer = async function (req, res) {
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
exports.customerProfile = async function (req, res) {
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
exports.updateDataCustomer = async function (req, res) {
  try {
    const { id } = req.customer;
    if (id) {
      const body = req.body;
      const customer = await Customers.findOne({ _id: id });

      if (!customer) {
        const error = new Error("customer not found");
        error.statusCode = 404;
        throw error;
      }

      const existingEmail = await Customers.findOne({
        _id: id,
        email: body.email,
      });
      if (existingEmail) {
        const error = new Error("Email already exists");
        error.statusCode = 400;
        throw error;
      }
      await Customers.updateOne({ _id: id }, { $set: { ...body, _id: id } });

      res.status(200).json("User updated successfully");
    } else {
      const error = new Error("customer not found");
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
