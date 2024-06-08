const express = require("express");
const multer = require("multer");
const {
  createCompany,
  companyLogin,
} = require("../controllers/CompanyController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/signup",
  upload.fields([{ name: "companyLogo" }, { name: "companyImage" }]),
  createCompany
);
router.post("/login", companyLogin);

module.exports = router;
