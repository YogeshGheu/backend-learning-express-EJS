import express from "express";
import { validateUserBYEmail } from "../validations/user.validate.js";
import { generateToken } from "../services/authentication.service.js";
import { User } from "../models/user.model.js";
// import cookieParser from 'cookie-parser';

const router = express.Router();
// router.use(cookieParser())

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

	if (!user) {
		return res.render("login", { errorMessage: "User not found" });
	}

	const isPasswordValid = function (userPassword, requestPassword) {
		if (userPassword == requestPassword) {
			return true;
		} else {
			return false;
		}
	};

	if (isPasswordValid(user.password, req.body.password)) {
		const token = generateToken(user);
		res.cookie("token", token);
		res.render("home");
	} else {
		res.render("login", {
			errorMessage: "Username or password is incorrect",
		});
	}
});

router.get("/logout", (req, res) => {
	res.cookie("token", "").redirect("/user/login");
});

export default router;
