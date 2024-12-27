const AuthUtils = require("../../utils/auth/authUtils");
const userServices = require("../services/servicesHandler");

const loginUser = async (request, response) => {
    if (!request.body) {
        return response.status(400).json({ message: "Body is required" });
    }

    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({ message: "Both Email and Password are required" });
    }

    const userLoginDetails = await userServices.getLoginDetailsByEmail(email);

    if (!userLoginDetails || userLoginDetails.length == 0) {
        return response.status(400).json({ message: "Email does not exists" });
    }

    if (!AuthUtils.compareHash(password, userLoginDetails[0].password)) {
        return response.status(400).json({ message: "Password is invalid" });
    }

    return response.status(200).json({ message: "User login successful", data: { id: userLoginDetails[0].id, email: userLoginDetails[0].email, token: AuthUtils.generateToken(email) } });
};

module.exports = loginUser;
