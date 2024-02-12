import jwt from "jsonwebtoken";
const jwtKey = "loginKye";

const isLogined  = async (req, res, next) => {
    try {
		if (req.cookies.token) {
			const decode = jwt.verify(req.cookies.token, jwtKey);
			if(decode.id) {
				req.decode = decode;
				next();
			}
			else res.status(401).render('noLogin.hbs', {
				title: `У Вас недостаточно прав`,
				text: `У Вас недостаточно прав для осущетвления этого действия`
			});
		}
		else res.status(401).render('noLogin.hbs', {
			title: `У Вас недостаточно прав`,
			text: `У Вас недостаточно прав для осущетвления этого действия`
		});
	}
	catch (error) {
        console.log("error: ", error);
        res.status(401).json({
            message: error.message
        })
    }
}

export default isLogined;