// // Follow this setup guide to integrate the Deno language server with your editor:
// // https://deno.land/manual/getting_started/setup_your_environment
// // This enables autocomplete, go to definition, etc.

// // Setup type definitions for built-in Supabase Runtime APIs
// import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// console.log("Hello from Functions!")

// Deno.serve(async (req) => {
//   const { name } = await req.json()
  
//   const data = {
//     message: `Hello ${name}!`,
//   }

//   return new Response(
//     JSON.stringify(data),
//     { headers: { "Content-Type": "application/json" } },
//   )
// })

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { stripe } from '../_utils/stripe.ts';
import { createOrRetrieveProfile } from '../_utils/supabase.ts';






// esm.sh is used to compile stripe-node to be compatible with ES modules.
console.log('Hello from Functions!');

serve(async (req) => {
  try {
    const { amount } = await req.json();
  const customer= await createOrRetrieveProfile(req)

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer },
    { apiVersion: "2020-08-27" }
  );

// Create a PaymentIntent so that the SDK can charge the logged in customer.
const paymentIntent = await stripe.paymentIntents.create({
  amount:amount || 1099,
  currency: 'usd',
  customer: customer,
});

    const res = {
      publishableKey: 'pk_test_51QeYtyQqPkg0yPJEzvad0pwi8Zl7enJM8L9PpcODuuvDS0uGJwS20oJS6SI3vwtuSBgJV9xaMnNrapy1LkQNHxn000LRC5kTV6',
      // publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer,
    };
    // console.log(res+"kjjbdfkjebf")
    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});


