const {Users} = require('../models/Users');
const bcrypt = require('bcrypt')



exports.login = async function(req,res){
    
}
exports.addUsers = async function(req,res){
    try{
           const {role,userName,firstName,lastName,email,password}=req.body;
           //check the existing user
           const [existingUsername, existingEmail] = await Promise.all([
            Users.findOne({ userName }),
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
            username,
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
            return res.status(500).json({ error: "Unable to save user" });
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
