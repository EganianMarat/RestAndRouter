
const validation = (req, res, next) => {
	if (!req.body.name || !req.body.price || !req.body.currency) res.status(404).send(`Invalid request`);
	else next();
}

export default validation;