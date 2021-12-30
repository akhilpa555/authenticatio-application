const express = require('express')
const app = express()
var cors = require('cors')
const port = process.env.port || 4000
app.use(cors())
app.use(express.json())
const Razorpay=require('razorpay')
const crypto = require("crypto");
var oid = ''
const hmac = crypto.createHmac('sha256', 'ORqSxK44seimcQsWA0SF2FuR');


var instance = new Razorpay({
    key_id: 'rzp_test_rR5UxXXu0FOMdh',
    key_secret: 'ORqSxK44seimcQsWA0SF2FuR',
  });



app.listen(port,()=>{
    console.log('Server is up')
})

app.get('/' ,(req,res)=>{
    var options = {
        amount: 5000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
        oid=order.id
        res.json(order)
        //console.log(order);
      });
    
})

app.post('/getorderdata', (req,res)=>{
 hmac.update(oid + "|" + req.body.payid );
 let generatedSignature = hmac.digest('hex');
 
 let isSignatureValid = generatedSignature == req.body.sign;
 

  if (isSignatureValid) {
    console.log('payment is successful')
  }else{
    console.log('Not succesfull')
    console.log('Heys')
  }
}

)