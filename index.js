const axios = require('axios');
const uuid = require('uuid');

function Test(key){
return key;
}

//get all paymentLink
const getAllPaymentLinks = async (authKey) => {
  
    let config = {
        headers:{
          "Authorization":authKey,
          "Content-Type" : "application/json",
          "Accept":"*/*"
        }
      };
const data=await axios.get('https://api.razorpay.com/v1/payment_links/',config)


return data.data;
  };


//create paymentlink
async function CreatePaymentLink(payload,authKey) {
    let config = {
        headers:{
          "Authorization":authKey,
          "Content-Type" : "application/json",
          "Accept":"*/*"
        }
      };
  
  const date = new Date();
const unixTimestamp = Math.floor(date.getTime() /1000)+10000;

  const payload=  {
      "amount":Math.floor(payload.amount),
      "currency": "INR",
      "accept_partial": false,
      "first_min_partial_amount": 0,
      "expire_by": unixTimestamp,
      "reference_id": uuid.v1().toString(),
      "description": payload.description,
      "customer": {
        "name":payload.name,
        "contact": payload.contact,
        "email": payload.email
      },
      "notify": {
        "sms": true,
        "email": true
      },
      "reminder_enable": true,
      "notes": {
        "policy_name": payload.policyName
      },
      "callback_url": payload.callbackUrl,
      "callback_method": "get"
    }
  const data=await axios.post('https://api.razorpay.com/v1/payment_links/',payload,config)
  
 
  return data.data;
    };

    //get paymentLink byId

   async function GetPaymentById(paymentId,authKey)  {
    let config = {
        headers:{
          "Authorization":authKey,
          "Content-Type" : "application/json",
          "Accept":"*/*"
        }
      };
     
    const data=await axios.get('https://api.razorpay.com/v1/payment_links/'+paymentId,config)
    
   
    return data.data;
    
      };


      async function GetOrderById(orderId,authKey ){
        let config = {
            headers:{
              "Authorization":authKey,
              "Content-Type" : "application/json",
              "Accept":"*/*"
            }
          };
       
      const data=await axios.get(`https://api.razorpay.com/v1/orders/${orderId}`,config)
      
      return data.data;
      
        };
module.exports={
    getAllPaymentLinks,
    CreatePaymentLink,
    GetPaymentById,
    GetOrderById,
    Test
    }