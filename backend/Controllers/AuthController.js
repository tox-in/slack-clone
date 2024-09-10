const User = require("../Models/User.model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const login = asyncHandler(async (req, res) => {
    const { emailOrPhone, password } = req.body;

    let user;
    if (/\S+@\S+\.\S+/.test(emailOrPhone)) {
        user = await User.findOne({ email: emailOrPhone }).select("+password");
    } else {
        user = await User.findOne({ phone: emailOrPhone }).select("+password");
    }

    if (!user) {
        res.status(401);
        throw new Error("Email cyangwa telephone cyangwa password siyo");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401);
        throw new Error("Email cyangwa telephone cyangwa password siyo");
    }

    res.status(200).json({
        success: true,
        message: "Login successful",
    });
});

const signup = asyncHandler(async (req, res) => {
    const { emailOrPhone, username, password } = req.body;
    console.log(req.body);
    

    if (!username || !password) {
        res.status(400);
        throw new Error("Izina cyangwa password ntabwo byuzuye.");
    }

    let user;
    let isEmail = /\S+@\S+\.\S+/.test(emailOrPhone);

    if (isEmail) {
        user = await User.findOne({ email: emailOrPhone });
        if (user) {
            res.status(400);
            throw new Error("Imeli iramaze gufatwa.");
        }
    } else {
        user = await User.findOne({ phone: emailOrPhone });
        if (user) {
            res.status(400);
            throw new Error("Telephone iramaze gufatwa.");
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email: isEmail ? emailOrPhone : undefined,
        phone: isEmail ? undefined : emailOrPhone,
        username,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
        success: true,
        message: "Umukoresha mushya yashyizweho.",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
        },
    });
});

module.exports = {login,signup}