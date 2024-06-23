import express from "express";
import connection from "./connections/connect.mongoose.js";
import "dotenv/config";
import bodyParser from "body-parser";
import userRouter from "./routes/user.router.js"

connection(process.env.MONGO_URL);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about")
});
app.get("/services", (req, res) => {
  res.render("services")
});
app.get("/contact", (req, res) => {
  res.render("contact")
});

app.use("/user", userRouter)

// app.get("/signup", (req, res) => {
// 	res.render("signup");
// });

// app.post("/signup-submit", async (req, res) => {
// 	console.log(req.body);
// 	const user = await User.create({
// 		email: req.body.email,
// 		username: req.body.username,
// 		password: req.body.password,
// 	});
// 	console.log("this is user", user);
// 	res.redirect("/login");
// });

// app.get("/login", (req, res) => {
// 	res.render("login");
// });

// app.post("/login-submit", async (req, res) => {
// 	const user = await validateUserBYEmail(req.body.email);

// 	if (user && req.body.password == user.password) {
// 		res.render("home");
// 	} else {
// 		res.render("login", {
// 			errorMessage: "username or password is incorrect",
// 		});
// 	}
// });

app.listen(port, "0.0.0.0", () => {
	console.log(`Example app listening on port ${port}`);
});
