import express from "express";
import { validateUserBYEmail } from "../validations/user.validate.js";
import { generateToken } from "../services/authentication.service.js";
import { User } from "../models/user.model.js";
import {
	encryptPassword,
	decryptPassword,
} from "../services/encryption.service.js";
import cookieParser from "cookie-parser";

const router = express.Router();
// router.use(cookieParser())

router.get("/signup", (req, res) => {
	res.render("signup");
});

router.post("/signup-submit", async (req, res) => {
	try {
		const encryptedPassword = await encryptPassword(req.body.password);
		const user = await User.create({
			email: req.body.email,
			username: req.body.username,
			password: encryptedPassword,
		});
		console.log("this is user", user);
		res.redirect("/user/login");
	} catch (error) {
		console.error("Error during signup:", error);
		res.render("signup");
	}
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login-submit", async (req, res) => {
	const user = await validateUserBYEmail(req.body.email);

	if (!user) {
		return res.render("login", { errorMessage: "User not found" });
	}

	const isPasswordValid = await decryptPassword(
		req.body.password,
		user.password
	);

	if (isPasswordValid) {
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
