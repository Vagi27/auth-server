const validator = require("validator");

const validateSignUpData = (req) => {
    const { name, dateOfBirth, username, password } = req.body;
    //date not yet confirm
    if (!name || !dateOfBirth || !username || !password) {
        throw new Error("Fill all Details!");
    }
    if (!validator.isLength(name, { min: 3, max: 30 }))
        throw new Error("min chars:3 max chars:30!");
    if (!validator.isLength(username, { min: 3, max: 30 }))
        throw new Error("min chars:3 max chars:30!");

    if (!validator.isStrongPassword(password)) {
        throw new Error(
            "Invalid!\nPassword must include,\n minimum length 8 \n 1 lowercase\n 1 uppercase\n 1 number"
        );
    }
};
const validateLoginData = (req) => {
    const { username, password } = req.body;
    if (!username || validator.isLength(username, { min: 3, max: 30 })) {
        throw new Error("Invalid Username");
    }
    if (!password || validator.isStrongPassword(password)) {
        throw new Error("Invalid Password");
    }
};

module.exports = { validateSignUpData, validateLoginData };
