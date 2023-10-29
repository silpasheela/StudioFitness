import React, { useEffect,useState } from "react"
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { uninterceptedApiInstance, instance } from "../../api/axiosInstance"
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from "react-stripe-checkout";
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";

const stripePromise = await loadStripe('pk_test_51O5jK5SFewJqLbl0um0DUGqSV4WRzkXPTe6ACi1ZKiCPXqEYAszxWJnBUUbFub24LDZWMDokTD8VoYYuZO53lUN200H4TGJMNG');


// function Demos() {

//   const stripe = useStripe();
//   const elements = useElements();
//   const [planId, setPlanId] = useState('price_1O61X2SFewJqLbl0GYh4jPmU'); // replace with your plan ID
//   const [userId, setUserId] = useState('653ec2ddabaaa3dc99cc49e8'); // replace with your user ID

  

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

    

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       try {

//         const response = await instance.post('user/create-subscription', { 
//           _id: userId, 
//           planId: planId, 
//           cardToken: 'tok_visa',
//           paymentMethod: 'pm_card_visa'
//         });



//         console.log(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };


//   return (
//     <div>
//           <form onSubmit={handleSubmit}>
//             <CardElement />
//           <button type="submit" disabled={!stripe}>
//           Subscribe
//       </button>
//     </form>
//     </div>
//   )
// } //wrkng



// function Demos() {

//   const [loading, setLoading] = useState(false);

//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       const stripe = await loadStripe('pk_test_51O5jK5SFewJqLbl0um0DUGqSV4WRzkXPTe6ACi1ZKiCPXqEYAszxWJnBUUbFub24LDZWMDokTD8VoYYuZO53lUN200H4TGJMNG');
//       const { error } = await stripe.redirectToCheckout({
//         items: [{ plan: 'price_1O61X2SFewJqLbl0GYh4jPmU', quantity: 1 }],
//         successUrl: 'http://localhost:3000/user/dashboard',
//         cancelUrl: 'http://localhost:3000/demo',
//       });
    

//       if (error) {
//         console.error(error);
//         setLoading(false);
//       }

//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };


//   return (
//     <div>
//     <button onClick={handleClick} disabled={loading}>
//       {loading ? 'Processing...' : 'Subscribe'}
//     </button>
//   </div>
//   )
// }



function Demos() {
  const onToken = async (token) => {
    // Make an API call to your server to create a subscription
    try {
      const response = await instance.post("user/create-subscription", {
        planId: "price_1O61X2SFewJqLbl0GYh4jPmU", // replace with your plan ID
        token: token.id,
        userId: "653ec7e82f5dd20515cca03a", // replace with your user ID
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
      } else {
        console.error("Subscription creation failed.");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };

  return (
    <div>


<Stack
                direction= { 'row'}
                spacing={5}
                sx={{
                    marginTop: '5rem',
                    padding: '2rem'
                }}>
                <Box
                    sx={{
                        width: {lg: '65%' , md: '65%' , sm: '100%' , xs:'100%'},
                        border: '1px gray dotted',
                        padding: '1rem 0',
                        borderRadius: '.5rem'
                    }}>
                    <Typography
                        variant='h5'
                        sx={{
                            alignSelf: 'flex-start',
                            paddingLeft: '3.5rem',
                            marginBottom: '1.5rem'
                        }}>
                        Personal Info
                    </Typography>
                    {/* <Divider sx={{marginBottom: '1rem'}}/> */}
                    <Stack direction= 'column' spacing={3} padding= '0 3.5rem'>
                        <TextField
                            id="fullName"
                            label="Full name"
                            variant="outlined"
                            // value={userDetails.fullName}
                        />
                        <TextField
                            id="userName"
                            label="Username"
                            variant="outlined"
                            // value={userDetails.userName}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            // value={userDetails.email}
                        />
                        <TextField
                            id="phone"
                            label="Phone"
                            variant="outlined"
                            // value={userDetails.phone}
                        />
      
                    </Stack>
                </Box>
                <Box sx={{
                    width: {lg:'30%' , md: '30%' , sm: '100%' , xs: '100%'},
                    border: '1px gray dotted',
                    borderRadius: '.3rem'
                }}>
                    <Typography variant='h5' padding= '1rem'>Booking Summary</Typography>
                    <Divider />
                    <Stack padding='.8rem' direction='row' spacing={2}>
                        <Box padding= '.3rem 0rem'>
                            <Typography
                                variant='subtitle1' 
                                sx={{color: 'gray'}}
                            >
silpa
                            </Typography>
                        </Box>
                    </Stack>
                    
                    <Divider sx={{ width: '90%', margin: '.5rem auto' }} />
                    <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '.4rem 1.5rem'
                    }}>
                        <Typography
                            sx={{
                                fontSize: '1.5rem',
                                letterSpacing: '.3rem'
                            }}
                        >
                            Total
                        </Typography>
                        <Typography  sx={{
                                fontSize: '1.5rem',
                                letterSpacing: '.3rem'
                        }}>
rupee
                        </Typography>
                    </Box>
                </Box>
            </Stack>



      <StripeCheckout
        stripeKey="pk_test_51O5jK5SFewJqLbl0um0DUGqSV4WRzkXPTe6ACi1ZKiCPXqEYAszxWJnBUUbFub24LDZWMDokTD8VoYYuZO53lUN200H4TGJMNG"
        token={onToken}
        name="Your Company"
        description="Subscription Payment"
        amount={199900} // Amount in cents
        currency="inr"
      />
    </div>
  );
}











export default Demos