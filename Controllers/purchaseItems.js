import Stripe from "stripe"
const stripe = (Stripe)(process.env.STRIPE_SECRET_KEY);
const calculateOrderAmount = (subtotal,inr = 1) => {
    subtotal= (subtotal*inr)*100;
    return subtotal;
  };
export const purchaseItems = async(req,res)=>{
    //profile cart subtotal userinfo
    const {_id,profile,cart,subtotal2} = req.body;
    // Create a PaymentIntent with the order amount and currency
    // const cartData = cart?.data;
    console.log(profile)
    try{
        
            const paymentIntent = await stripe.paymentIntents.create({
                receipt_email:profile?.email,
                shipping: {
                  address: {
                      city: profile?.city,
                      line1: profile?.addressone,
                      line2: profile?.addresstwo,
                      postal_code: profile?.pinCode,
                      state: profile?.state,
                      country:profile?.country,

                  },
                  name: profile?.name,
                  tracking_number:profile?.mobile,
              },
                amount: calculateOrderAmount(subtotal2?.data?.totalPrice),
                currency: "inr",
                automatic_payment_methods: {
                  enabled: true,
                },
              });
              res.status(200).json({
                clientSecret: paymentIntent.client_secret,
              });
        
    }
    catch(error){
        console.log(error)
    }
}
