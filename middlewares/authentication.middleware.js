import { validateToken } from "../services/authentication.service.js";

const validateTokenOnEachRequestMiddleware = async function (req, res, next) {
	const requestToken = req.cookies.token;
	
	if (!requestToken) {
		res.render("login", {errorMessage:"you are not logged in, Please login."})
	}

	try {
		const payload = validateToken(requestToken);
		if(!payload){
			res.render("login", {errorMessage:"Something went wrong"})
			return;
		} else {
			req.user = payload;
			next();
		}
	} catch (error) {
		return res.render("login", {errorMessage:"Session Timeout!"})
	}
};

export { validateTokenOnEachRequestMiddleware };
