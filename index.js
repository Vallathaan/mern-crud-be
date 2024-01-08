const config =require('./utils/config');
const mongoose = require('mongoose');
const app = require('./app');
console.log('connecting to MONGODB');
mongoose.connect(config.MONGO_URI)

  .then(() => {
    console.log('connected to MongoDB');
    app.listen(config.PORT,() => {
      console.log(`Server running on PORT ${config.PORT}`)})
  })
  .catch((error)=>{
    console.error('error in connecting in MongoDB',error)
  })
