const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.patch("/changeactivity/:id", userController.changeUserActivity);
router.post("/login", userController.login);
<<<<<<< HEAD
router.post("/requestotp",userController.RequestOTP)
router.post("/verifyotp",userController.verifyOTP);
router.post("/resetpassword",userController.resetPassword);
=======
router.post("/requestotp", userController.RequestOTP);
router.post("/verifyotp", userController.verifyOTP);
router.post("/resetpassword", userController.resetPassword);
>>>>>>> 7f606b140266d941adbfec5bd89f8c5b85310082

module.exports = router;
