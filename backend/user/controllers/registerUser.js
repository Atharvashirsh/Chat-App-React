const UserServices = require("../services/servicesHandler");
const AuthUtils = require("../../utils/auth/authUtils");

const registerUser = async (request, response) => {
    if (!request.body) {
        return response.status(400).json({ message: "Body is required" });
    }
    const { name, email, password, pic } = request.body;

    if (!name || !email || !password) {
        return response.status(400).json({ message: "Name, Email and Password is required" });
    }

    const user = await UserServices.findUserByEmail(email);

    if (user && user.length > 0) {
        return response.status(400).json({ message: "Email already exists", data: user });
    }

    const userData = { name, email, password, pic };
    userData.password = AuthUtils.generateHash(password);

    const addUser = await UserServices.addNewUser(userData);

    console.table(addUser);
    if (addUser.affectedRows > 0) {
        return response.status(201).json({ message: "User registered successfully", data: { ...userData, token: AuthUtils.generateToken(email) } });
    }

    return response.status(500).json({ message: "Internal Server Error" });
};

module.exports = registerUser;
