import express from "express";
import connection from "./connections/connect.mongoose.js";
import "dotenv/config";
import bodyParser from "body-parser";
import userRouter from "./routes/user.router.js"
import appRouter from "./routes/app.router.js"

connection(process.env.MONGO_URL);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use("/user", userRouter)
app.use("/app", appRouter)



app.listen(port, "0.0.0.0", () => {
	console.log(`Example app listening on port ${port}`);
});
