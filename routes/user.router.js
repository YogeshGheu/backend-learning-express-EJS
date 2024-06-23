import express from 'express'
import { validateUserBYEmail } from "../validations/user.validate.js";
import { User } from "../models/user.model.js";


const router = express.Router();

router.get("/signup", (req, res) => {
	res.render("signup");
});

router.post("/signup-submit", async (req, res) => {
	console.log(req.body);
	const user = await User.create({
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
	});
	console.log("this is user", user);
	res.redirect("/user/login");
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login-submit", async (req, res) => {
	const user = await validateUserBYEmail(req.body.email);

	if (user && req.body.password == user.password) {
		res.render("home");
	} else {
		res.render("login", {
			errorMessage: "username or password is incorrect",
		});
	}
});

export default router;