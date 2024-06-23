import express from "express"

const router = express.Router()

router.get("/home", (req, res) => {
	res.render("home");
});

router.get("/about", (req, res) => {
  res.render("about")
});
router.get("/services", (req, res) => {
  res.render("services")
});
router.get("/contact", (req, res) => {
  res.render("contact")
});

export default router;