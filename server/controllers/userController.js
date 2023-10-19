const {Users} = require('../models/Users');
const {JWT_SECRET}= require('../config/env');
const jwt = require('jsonwebtoken');
const emailSender = require('../config/emailSender');
const bcrypt = require('bcrypt')



exports.login = async function(req,res){
    const { user_name, password } = req.body;

    try {  
       
        const user = await Users.findOne({ user_name });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id,username:user.user_name },JWT_SECRET);

        return res.json({ token });
     }catch(err){
        return res.status(400).json(error.message);
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
            return res.status(201).json({ msg: "user created successfully" });
        } else {
            return res.status(403).json({ error: "you don't have enough privilege" });
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
        if (users.length === 0) { 
            res.status(400).send("Page vide");
          } else {
            res.status(200).send(users);
          }
  
     
  
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
  
        await Users.updateOne({ _id: id }, body);
  
        res.status(201).send('User updated successfully');
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
exports.DeleteUser = async function(req,res){
  try{
    const {id} = req.params;
    const user =await Users.findOne({ _id: id })
    if(!user){
      res.status(404).send('user Not found');
    }
       await user.deleteOne()
    res.status(201).send('user deleted successfully');

  }catch(error){
    res.status(500).send(error)
  }



}
