const exporess = require("express");
const { login } = require("../controllers/authController");
const router = exporess.Router();

router.post("/login", login);

module.exports = router;
