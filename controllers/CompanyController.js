const express = require("express");  
const mongoose = require("mongoose");  
const cors = require('cors');  
const bodyParser = require("body-parser");  
const dotenv = require("dotenv");  
  
const userRoutes = require("./routes/users");  
const app = express();  
dotenv.config();  
  
app.use(bodyParser.json());  
  
  
mongoose.connect(process.env.MONGODB_URL)  
  .then(() => {  
    console.log('Connected to MongoDB');  
  })  
  .catch((error) => {  
    console.error('Error connecting to MongoDB:', error);  
  });  
    
  
app.use(cors({origin: '*'}));    
app.use(express.json());    
app.use("/users", userRoutes);  
  
  
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}`);  
});