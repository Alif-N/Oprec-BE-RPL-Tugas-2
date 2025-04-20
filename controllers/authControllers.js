const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
    try {
        const { username, password, displayName, bio, role } = req.body;
        const userExist = await User.findOne({ username });
        if (userExist) { return res.status(400).json({ message: "Username already exists" })}
        if (role == "admin") { return res.status(400).json({ message: "Role cannot be admin" })}
        if (role !== "admin" && role !== "user") { return res.status(400).json({ message: "Invalid role" })}
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            displayName,
            bio,
            role
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to register user", error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Failed to login", error });
    }
};

module.exports = {
    register,
    login
};