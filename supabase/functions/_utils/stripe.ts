import Stripe from 'https://esm.sh/stripe@17.5.0?target=deno&deno-std=0.132.0&no-check';

// Make sure to pass the key directly like this:
export const stripe = Stripe('sk_test_51QeYtyQqPkg0yPJE43VWag4iiu1lNteHCP6N0X3j2DBfPYFRCVVH5LGR0ioOPYCiOfHi0EysGZaDpmTxGUqJQPTB00QeH41GKj', {
  httpClient: Stripe.createFetchHttpClient(),
});

// // Test Stripe by creating a payment intent
// async function testStripe() {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000, // Amount in cents (e.g., $10.00)
//       currency: 'usd',
//       payment_method_types: ['card'],
//     });

//     console.log('Payment Intent created successfully:', paymentIntent);
//   } catch (error) {
//     console.error('Error creating Payment Intent:', error);
//   }
// }

// // Run the test
// await testStripe();
