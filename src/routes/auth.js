const authRouter = require("express").Router();
const Encryptor = require("../services/encryptor");
const {
    validateSignUpData,
    validateLoginData,
} = require("../utils/validations");

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
    } catch (err) {
        res.send("something went wrong in signup");
    }
});
authRouter.post("/login", async (req, res) => {
    try {
        validateLoginData(req);
    } catch (err) {
        res.send("something went wrong in signup");
    }
});

module.exports = { authRouter };
