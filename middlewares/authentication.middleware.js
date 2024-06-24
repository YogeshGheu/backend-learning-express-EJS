import { validateToken } from "../services/authentication.service.js";
import { validateUserBYEmail } from "../validations/user.validate.js";
import { generateToken } from "../services/authentication.service.js";
import userRouter from "../routes/user.router.js";

const insertTokenIfNotExists = async function (req, res, next) {
	const requestCookie = req.cookies.token;
	if (!requestCookie) {
		console.log("no cookie found!");
		const user = await validateUserBYEmail(req.body.email);
		if (!user) {
			return res.render("login");
		}

		const isPasswordValid = function (userPassword, requestPassword) {
			if (userPassword == requestPassword) {
				return true;
			} else {
				return false;
			}
		};
		if (isPasswordValid) {
			const token = generateToken(user);
			res.cookie("token", token);
			next();
		} else {
			res.render("login", {
				errorMessage: "Username or password is incorrect",
			});
		}
	} else {
		console.log("this is else block")
		next();
	}
};

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
		return res.render("login", {errorMessage:"Token manipulated, Please login again!"})
	}
	

	

	// 	const user = await validateUserBYEmail(req.body.email);

	// 	if (!user) {
	// 		return res.render("login", { errorMessage: "User not found" });
	// 	}

	// 	const isPasswordValid = user.password == req.body.password ? true : false;

	// 	if (isPasswordValid) {
	// 		const token = generateToken(user);
	// 		res.cookie("token", token);
	// 		res.render("home");
	// 		next()
	// 	} else {
	// 		res.render("login", {
	// 			errorMessage: "Username or password is incorrect",
	// 		});
	// 	}
	// 	// return res.render("login");
	// }

	// try {
	// 	const requestPayload = validateToken(requestCookie);
	// 	req.user = requestPayload;
	// 	next();
	// } catch (error) {
	// 	console.log("Invalid token:", error.message);
	// 	return res.render("login"); // Return to prevent further processing
	// }
};

export { insertTokenIfNotExists, validateTokenOnEachRequestMiddleware };
