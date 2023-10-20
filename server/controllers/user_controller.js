const User = require('../models/user_model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const signup = async (req, res) => {
    const { name, email, password, profileImage } = req.body
    try {
        const count = await User.countDocuments({});
        let role = "user"
        if (count === 0) {
            role = "admin"
        };

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt).catch((err) => {
            throw err
        });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' })
        };

        const user = new User({
            name,
            email,
            password: hashedPassword,
            profileImage,
            role,
            createdAt: Date.now()
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        };

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid Credentials' });
        };

        const token = jwt.sign({
            email: user.email,
            id: user.id,
            role: user.role
        },
            jwt_secret,
            {
                expiresIn: '7d'
            }

        );

        res.status(200).json({ message: 'loggedin', token, user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = {
    signin,
    signup
}