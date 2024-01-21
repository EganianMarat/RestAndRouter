
const validation = (req, res, next) => {
	if (!req.body.name || !req.body.price || !req.body.currency || !req.body.kilometer || !req.body.description || !req.body.madeDate) res.status(404).send(`Invalid request`);
	else next();
}

module.exports = validation;