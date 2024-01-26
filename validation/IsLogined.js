const jwt = require("jsonwebtoken");
const jwtKey = "loginKye";

const isLogined  = async (req, res, next) => {
    try {
		if (req.cookies.token) {
			const decode = jwt.verify(req.cookies.token, jwtKey);
			console.log("decode: ", decode);
		}
		next();
	}
	catch (error) {
        console.log("error: ", error.message);
        res.status(401).json({
            message: error.message
        })
    }
}

module.exports = isLogined;