const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const JobRoute = require("./routes/JobRoute");
const CompanyRoute = require("./routes/CompanyRoutes");
const auth = require("./middlewares/auth");

const jobFormRoute = require("./routes/jobFormRoute");
// Middleware
app.use(cors());
app.use(express.json());
// app.use(middleWares.auth);

// Routes
app.use("/jobs", JobRoute);
app.use("/jobForm", jobFormRoute);

app.use("/companies", CompanyRoute);

// app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Server started");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
