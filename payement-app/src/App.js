import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
// import { useHistory } from 'react-router-dom';
const loadscript = ()=>{




return new Promise((resolve=>{
const script = document.createElement('script')
script.src='https://checkout.razorpay.com/v1/checkout.js'
document.body.appendChild(script)
script.onload=()=>{
  resolve(true)

}
script.onerror=()=>{
  resolve(false)

}


  }))
}

function App() {
 // const history = useHistory()
const [orderid,setorderid] = useState('')
const [amount,setamount] = useState('')
const[payement,setpayment] = useState({payid:'',
orderid:'',
sign:''})
const [showpayement,setshowpayement] = useState(false)
  useEffect(() => {
    fetch('http://localhost:4000/')
    .then(response => response.json())
    .then(data => {
      console.log('hi')
      setorderid(data.id)
      setamount(data.amount)
      console.log(data)}
      );

  },[]);
  const showrazerpay = async()=>{

const loaded = await loadscript()
if(loaded)
{
  var options = {
    "key": "rzp_test_rR5UxXXu0FOMdh",
    "amount": amount,
    "currency": "INR",
    "name": "Akhil's App",
    "description": "Test Transaction",
    "image": "https://media-exp1.licdn.com/dms/image/C5603AQFCTosuaZw7Dg/profile-displayphoto-shrink_800_800/0/1624006922255?e=1643241600&v=beta&t=JvObnRpe_38-clC5EwEC2Kf1xW0JY6WK4QaPZnpOUSU",
    "order_id": orderid,
    "handler": function (response){
      setshowpayement(true)
      setpayment({
        payid:response.razorpay_payment_id,
        orderid:response.razorpay_order_id,
        sign:response.razorpay_signature
      })

      fetch('http://localhost:4000/getorderdata' , {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
        body:JSON.stringify({
        payid:response.razorpay_payment_id,
        orderid:response.razorpay_order_id,
        sign:response.razorpay_signature
        })
      })
    .then(response => response.json())
    .then(data => {
      console.log(data)}
      );
     // alert(response.razorpay_payment_id);
      //alert(response.razorpay_order_id);
      //alert(response.razorpay_signature)
     // history.push('/aaa')
    }

      ,
    "prefill": {
        "name": "Akhil PA",
        "email": "akhilpa555@gmail.com",
        "contact": "7510854426"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }

};
var rzp1 = new window.Razorpay(options);
rzp1.open();
rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
})

}
else{
  alert('Its not wrking')
}



  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
        <button onClick={showrazerpay}>Payment</button>
        {showpayement && <div>
        <h2>Payement Id</h2>{payement.payid}
        <h2>Order ID</h2>{payement.orderid}
        {/* <h2>Signature</h2>{payement.sign} */}<br></br>
        <button onClick={()=>{setshowpayement(false)}}>Done</button>
        </div>}
        
      
      </header>
    </div>
  );
}

export default App;
