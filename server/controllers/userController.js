const {Users} = require('../models/Users');
const {JWT_SECRET}= require('../config/env')
const jwt = require('jsonwebtoken');

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
        return res.status(400).json({ error: "Invalid credentials" });
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

        if (result) {
            return res.status(201).json({ msg: "user created successfully" });
        } else {
            return res.status(403).json({ error: "you don't have enough privilege" });
        }
    }catch(error){
        res.status(500).send(error)
    }

}
exports.allUsers = async function(req,res){

}
exports.usersById = async function(req,res){

}
exports.SearchUser = async function(req,res){

}
exports.UpdateUser = async function(req,res){

}
exports.DeleteUser = async function(req,res){

}
