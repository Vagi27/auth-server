const authRouter = require("express").Router();
const Encryptor = require("../services/encryptor");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_Secret_Key = require("../config/config").JWT_Secret_Key;

const {
    validateSignUpData,
    validateLoginData,
} = require("../utils/validations");

authRouter.post("/signup", async (req, res) => {
    try {
        console.log("signup request received");

        validateSignUpData(req);
        const user = new User(req.body);

        const foundUser = await User.findOne({ username: req.body.username });
        if (foundUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await Encryptor.hash(user.password);

        user.password = hashedPassword;
        user.save();
        res.json({ message: "User Added Successfully", data: user });
    } catch (err) {
        res.send("something went wrong in signup\n " + err.message);
    }
});
authRouter.post("/login", async (req, res) => {
    try {
        console.log("login request received");
        validateLoginData(req);
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            throw new Error("user does not exist!");
        }

        const match = await Encryptor.compareHash(password, user.password);
        if (!match) {
            throw new Error("invalid credentials!");
        }
        const payload = {
            name: user.name,
            username: user.username,
            dateOfBirth: user.dateOfBirth,
        };
        const token = jwt.sign(payload, JWT_Secret_Key);
        // console.log(token);
        res.cookie("token", token, {
            httpOnly: true,
        });
        return res.status(200).json({ message: "Login successful", payload });
    } catch (err) {
        res.send("something went wrong in login\n" + err.message);
    }
});

module.exports = { authRouter };
