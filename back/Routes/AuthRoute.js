const { Signup, Login, CheckPassword, UpdateUser} = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login)
router.post('/check-password', CheckPassword)
router.put('/user', UpdateUser)
router.post('/', userVerification)

module.exports = router;