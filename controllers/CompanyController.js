const Company = require("../models/CompanyModel");
const bcrypt = require("bcrypt");

const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyIndustry,
      companyEmail,
      companyPassword,
      companyLocation,
    } = req.body;

    const existingCompany = await Company.findOne({ companyEmail });
    if (existingCompany) {
      return res
        .status(400)
        .json({ message: "Company with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(companyPassword, 10);

    const companyLogo = req.files["companyLogo"]
      ? req.files["companyLogo"][0].filename
      : null;
    const companyImage = req.files["companyImage"]
      ? req.files["companyImage"][0].filename
      : null;

    const newCompany = new Company({
      companyName,
      companyIndustry,
      companyEmail,
      companyPassword: hashedPassword,
      companyLocation,
      companyLogo,
      companyImage,
    });

    const savedCompany = await newCompany.save();

    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const companyLogin = async (req, res) => {
  let { companyEmail, companyPassword } = req.body;

  if (!companyEmail || !companyPassword) {
    return res
      .status(400)
      .json({ message: "You must provide email and password" });
  }

  try {
    let company = await companyModel.findOne({ companyEmail });
    if (!company) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    let isValid = await bcrypt.compare(
      companyPassword,
      company.companyPassword
    );
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let token = jwt.sign(
      { data: { companyEmail: company.companyEmail, id: company._id } },
      "This_is_my_jwt"
    );

    res.status(200).json({ message: "Success", token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
module.exports = { createCompany, companyLogin };
