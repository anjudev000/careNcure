const express = require("express");
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./models/dbConnect');
const logger = require("morgan");
const path=require('path');
const cors = require('cors');
const {notFound,errorHandler} = require('./middleware/errorHandling');
 
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

const userRoute = require('./routes/userRoutes');
app.use('/api',userRoute);


//error handler
// app.use((err, req, res, next) => {
//   res.status(err.status || 500).send(err.message || 'Internal Server Error');
// });
app.use('*',notFound);
app.use(errorHandler);


app.listen(3000,()=>{
  connectToMongoDB();
  console.log("server is running on port 3000...");
})
