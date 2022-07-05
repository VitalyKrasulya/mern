const jwt = require("jsonwebtoken")
const config = require("config");

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}
	
	try {
		//console.log("headers.authorization")
		//console.log(req.headers.authorization)
		const token = req.headers.authorization.split(" ")[1] //Bearer $token
		
		if (!token) {
			return res.status(401).json({message: "No authorization"})
		}
		
		const decoded = jwt.verify(token, config.get("jwtSecret"))
		req.user = decoded
		next()
		
	} catch (e) {
		console.log("!!! auth middleware error", e.message)
		res.status(401).json({message: "No authorization"})
	}
}