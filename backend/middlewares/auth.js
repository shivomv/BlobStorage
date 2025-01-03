const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
exports.isAuthenticatedUser = catchAsyncErrors(
    async (req, res, next) => {
        const { token } = req.cookies;
        if (!token) {
            return next(new ErrorHandler("Please login to access this resource", 401));
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decodedData.id)
        next();
    }
)

exports.authorizeRoles = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource
                `, 403));
        }
        next();
    }
}
