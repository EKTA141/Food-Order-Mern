const express = require('express')
var cors = require('cors')
const db = require('./db')
const dotenv = require('dotenv')
const app = express()
const port = 3100
// const stripe = require("./Routes/Stripe")
const Razorpay = require('razorpay')
const path = require('path');
const fileURLToPath = require('url');
const { url } = require('inspector');
const ___filename = url.fileURLToPath(url.fileURLToPath);
const __dirname = path.dirname(___filename)

dotenv.config('./.env')
db()
app.use(cors({
  credentials : true,
  origin : 'http://localhost:3000'
  // origin : 'http://www.thegranddragon.com'
}))
app.use(express.json())
app.use(express.static(path.join(__dirname,'./client/build')))

module.exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

// app.get('/',(req,res)=>{
//   res.send('helllo')
// })
app.use('/api',require('./Routes/Createuser'));
app.use('/api',require('./Routes/DisplayData'));
// app.use('/api',require('./Routes/OrderData'));
app.use('/api',require('./Routes/Orderdata'))
app.use('/api',require('./Routes/PaymentRouter'))
// app.use('/api',stripe)

app.listen(port, () => {
  console.log(`foodapp Backend listening on port ${port}`)
})  

// module.exports = instance
