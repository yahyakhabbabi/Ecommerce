const { Users } = require("../models/Users");
const { JWT_SECRET, Refresh_JWT_SECRET } = require("../config/env");
const jwt = require("jsonwebtoken");
const emailSender = require("../config/emailSender");
const bcrypt = require("bcrypt");


exports.login = async function (req, res,next) {
  const { user_name, password } = req.body;

  try {
    const user = await Users.findOne({ user_name });

    if (!user) {
        const error = new Error('user not found');
        error.statusCode = 404;
        throw error;
    }

    if (!user.active) {
      const error = new Error("Account is not active");
        error.statusCode = 403;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("wrong password");
      error.statusCode = 401;
      throw error;
    }

    user.last_login = new Date();

    const accessToken = jwt.sign(
      { id: user._id, username: user.user_name, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, username: user.user_name, role: user.role },
      Refresh_JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();
    res.status(201).json({ message: 'User login!', token: { accessToken, refreshToken } });
  }catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};
exports.addUsers = async function (req, res,next) {
  try {
    const { role, user_name, firstName, lastName, email, password } = req.body;
    const [existingUsername, existingEmail] = await Promise.all([
      Users.findOne({ user_name }),
      Users.findOne({ email }),
    ]);

    if (existingUsername) {
      const error = new Error("Username already exists");
      error.statusCode = 403;
      throw error;
    }

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

    const user = new Users({
      user_name,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      role,
    });
    const result = await user.save();
    const emailText = `Dear ${firstName} ${lastName},\n\nWelcome to Our App!\n\nYour username: ${user_name}\nYour password: ${password}\n\nThank you for joining us!`;

    emailSender.sendEmail(email, "Welcome to Our App", emailText);

    if (result) {
      res.status(201).json({ message: 'User Created!', user: result});
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
exports.allUsers = async function (req, res,next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "Desc";
    const sortOrder = sort === "Desc" ? 1 : -1;

    const users = await Users.find({})
      .sort({ _id: sortOrder })
      .skip(skip)
      .limit(limit);
      res.status(200).json({ message: 'all users', users});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.usersById = async function (req, res,next) {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (user) {
      res.status(200).json({ message: 'usr found by id', user});

    } else {
      const error = new Error('user not found');
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
exports.SearchUser = async function (req, res,next) {
  try {
    const query = req.query.query || "";
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort || "DESC";
    const sortOrder = sort === "DESC" ? -1 : 1;

    const users = await Users.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { user_name: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ _id: sortOrder })
      .limit(limit)
      .skip(skip);

    if (users.length === 0) {
      const error = new Error('no users found');
        error.statusCode = 404;
        throw error;
    } else {
      res.status(200).json({ message: 'users found is:', users});
    }
  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.UpdateUser = async function (req, res,next) {
  try {
    const { id } = req.params;

    if (id) {
      const { firstName, lastName, email, role, active, user_name } = req.body; 

      const user = await Users.findOne({ _id: id });

      // if (!user) {
      //   return res.status(404).json("User not found"); 
      // }

      const [existingUsername, existingEmail] = await Promise.all([
        Users.findOne({ _id: id, user_name: user_name }), 
        Users.findOne({ _id: id, email: email }), 
      ]);

      if (existingUsername) {
        const error = new Error("Username already exists");
      error.statusCode = 403;
      throw error;
      }

      if (existingEmail) {
        const error = new Error("Email already exists");
        error.statusCode = 403;
        throw error;
      }

      const updatedUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        active: active,
        updatedAt: new Date(), 
      };

      await Users.updateOne({ _id: id }, updatedUser);
      res.status(200).json("User updated successfully");
    } else {
      const error = new Error("user not found");
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
exports.DeleteUser = async function (req, res,next) {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ _id: id });

    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }

    await user.deleteOne();

    return res.status(200).json("User deleted successfully");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
