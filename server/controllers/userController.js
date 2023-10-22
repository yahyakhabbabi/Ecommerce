const {Users} = require('../models/Users');
const {JWT_SECRET,Refresh_JWT_SECRET}= require('../config/env');
const jwt = require('jsonwebtoken');
const emailSender = require('../config/emailSender');
const bcrypt = require('bcrypt')



exports.login = async function (req, res) {
  const { user_name, password } = req.body;

  try {
    const user = await Users.findOne({ user_name });

    if (!user) {
      return res.status(400).json({ error: "Identifiants invalides" });
    }
    if (!user.active) {
      return res.status(403).json({ error: "Account is not active" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Identifiants invalides" });
    }

   
    user.last_login = new Date();
    
    const accessToken = jwt.sign(
      { id: user._id, username: user.user_name, role: user.role },
      JWT_SECRET,
      { expiresIn: '30s' }
    );

    const refreshToken = jwt.sign(
      { id: user._id, username: user.user_name, role: user.role },
      Refresh_JWT_SECRET,
      { expiresIn: '60s' }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res.json({ accessToken, refreshToken });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
exports.addUsers = async function(req,res){
    try{
           const {role,user_name,firstName,lastName,email,password}=req.body;
           //check the existing user
           const [existingUsername, existingEmail] = await Promise.all([
            Users.findOne({ user_name }),
            Users.findOne({ email })
        ]);

        if (existingUsername) {
            return res.status(400).json({ error: "Username already exists" });
        }

        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Users({
            user_name,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            role
        });
        const result = await user.save();
        const emailText = `Dear ${firstName} ${lastName},\n\nWelcome to Our App!\n\nYour username: ${user_name}\nYour password: ${password}\n\nThank you for joining us!`;

        emailSender.sendEmail(email, 'Welcome to Our App', emailText);

        if (result) {
            return res.status(201).send({ msg: "user created successfully" });
        } else {
            return res.status(403).send({ error: "you don't have enough privilege" });
        }
    }catch(error){
        res.status(500).send(error.message)
    }

}
exports.allUsers = async function(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = 10;
      const skip = (page - 1) * limit;
      const sort = req.query.sort || 'Desc'; 
      const sortOrder = sort === 'Desc' ? 1 : -1;
  
      const users = await Users.find({})
        .sort({ _id: sortOrder })
        .skip(skip)
        .limit(limit);
     
        res.status(200).send(users);
        
  
     
  
    } catch (error) {
      console.error(error); 
      res.status(500).send( error.message); 
    }
  };
exports.usersById = async function(req,res){
    const {id}=req.params;
    try{
        const user =await Users.findById(id)
        if (user) {
            res.status(200).send(user);
          } else {
            res.status(404).json({ message: "User not found" }); 
          }

    }catch(error){
        res.status(500).send(error);
    }

}
exports.SearchUser = async function (req, res) {
    try {
      const query = req.query.query || "";
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
      const sort = req.query.sort || 'DESC'; 
      const sortOrder = sort === 'DESC' ? -1 : 1; 
  
      const users = await Users.find({
        $or: [
          { firstName: { $regex: query, $options: 'i' } } , 
          { lastName: { $regex: query, $options: 'i' }}, 
          { email: { $regex: query, $options: 'i' } },
          { user_name: { $regex: query, $options: 'i' } },
        ],
      })
        .sort({ _id: sortOrder }) 
        .limit(limit)
        .skip(skip);
  
      if (users.length === 0) {
        res.status(404).send("No users found"); 
      } else {
        res.status(200).json(users); 
      }
    } catch (error) {
        console.error("Error:", error); 
      res.status(500).send(error.message);
    }
  };
  
exports.UpdateUser = async function (req, res) {
    try {
      const { id } = req.params;
      if (id) {
        const body = req.body;
  
        // Vérifiez d'abord si un utilisateur existe avec cet ID
        const user = await Users.findOne({ _id: id });
  
        if (!user) {
          return res.status(404).send('User not found');
        }
  
   
        const [existingUsername, existingEmail] = await Promise.all([
          Users.findOne({ _id: id, user_name: body.user_name }),
          Users.findOne({ _id: id, email: body.email }),
        ]);
  
        if (existingUsername) {
          return res.status(400).send({ error: "Username already exists" });
        }
  
        if (existingEmail) {
          return res.status(400).send({ error: "Email already exists" });
        }
  
      
        body.updatedAt = new Date();
        await Users.updateOne({ _id: id }, { $set: body });
  
        res.status(200).json('User updated successfully');
      } else {
        res.status(404).json('User not found');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  
exports.DeleteUser = async function (req, res) {
    try {
      const { id } = req.params;
      const user = await Users.findOne({ _id: id });
  
      if (!user) {
        return res.status(404).json('User not found');
      }
  
      await user.deleteOne();
  
      return res.status(200).json('User deleted successfully');
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  
