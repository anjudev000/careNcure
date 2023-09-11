const express = require("express");
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./models/dbConnect');
const logger = require("morgan");
const path=require('path');
const cors = require('cors');
const {notFound,errorHandler} = require('./middleware/errorHandling');
const passport = require('passport');
require('./middleware/passportAuthentication');

 
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const userRoute = require('./routes/userRoutes');
app.use('/api/user',userRoute);
const doctorRoute = require('./routes/doctorRoutes');
app.use('/api/doctor',doctorRoute);
const adminRoute = require('./routes/adminRoutes');
app.use('/api/admin',adminRoute);


app.use('*',notFound);
app.use(errorHandler);


app.listen(3000,()=>{
  connectToMongoDB();
  console.log("server is running on port 3000...");
})
