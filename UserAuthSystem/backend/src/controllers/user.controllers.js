import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';
import { validationResult } from 'express-validator';

// Register User Controller
const registerUser = async (req, res) => {
    try {
        // Check for validation errors (optional if you are using express-validator)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        // Ensure all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all fields: username, email, and password" });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user to the database
        await newUser.save();

        // Respond with success message
        return res.status(201).json({
            message: "User registered successfully",
            user: { username: newUser.username, email: newUser.email },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error registering user" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Ensure all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all fields: username, email, and password" });
        }

        const user = await User.findOne({ username })

        if (!user) return res.status(404).json({ error: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).json({ error: 'Invalid credentials' });

        req.session.user = { id: user._id, username: user.username };        
        res.json({ message: 'Login successful', user: req.session.user })

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

}

export { 
    registerUser ,
    loginUser
};
