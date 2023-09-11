/** @format */

const crypto = require("crypto");
const Razorpay = require("razorpay");
const Payment =require('../models/Payment')

const instance = new Razorpay({
  key_id: "rzp_test_Y1OV3eKH7LaSSh",
  key_secret: "4JUEicn4Weole2OuO9gxPA30",
});

module.exports.payment = async (req, res) => {
  const options = {
    amount: Number(req.body.amount *100), // amount in the smallest currency unit
    currency: "INR",
  };
  await instance.orders.create(options, function (err, order) {
    if (err) {
      console.log(err);
      return res.send({ code: 400, message: "server error" });
    } else {
      console.log(order);
      res.send({ code: 200, message: "success", data: order });
    }
  });
};
module.exports.paymentVerification = async (req, res) => {
  let body =
    
    req.body.response.razorpay_order_id +
    "|" + 
    req.body.response.razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "4JUEicn4Weole2OuO9gxPA30")
    .update(body.toString())
    .digest("hex");
 
    const isAuthentic =expectedSignature === req.body.response.razorpay_signature
    
    if(isAuthentic){
       
            const{razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature} = req.body.response
              try{
    await Payment.create({
        
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    })
    console.log(' payment done')
    res.json({success:true})
       
    } catch (error) {
        console.log(error)
        res.json({success:false})
    }
  }
  else{
      res.status(400).json({
          success :false,
      })
  }

};
