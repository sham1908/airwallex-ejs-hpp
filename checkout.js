// import { loadAirwallex, redirectToCheckout } from '@airwallex/airwallex-payment-elements';

// loadAirwallex({
//   env: 'demo', // Setup which Airwallex env ('demo' | 'prod') to integrate with
//   origin: window.location.origin, // Set up your event target to receive the browser events message
// });

// // Function to handle the redirect to the Hosted Payment Page
// const redirectToHPP = (intentId, clientSecret, currency) => {
//     redirectToCheckout({
//       env: 'demo', // Which env('staging' | 'demo' | 'prod') you would like to integrate with
//       intent_id: intentId,
//       client_secret: clientSecret,
//       currency: currency,
//     });
//   };

// // Event listener for the form submission
// document.getElementById('payment-form').addEventListener('submit', async (event) => {
//     event.preventDefault(); // Prevent the form from submitting the traditional way
  
//     try {
//       const amount = document.getElementById('amount').value;
//       const currency = document.getElementById('currency').value;
  
//       const response = await fetch('/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ amount, currency })
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to create PaymentIntent');
//       }
  
//       const data = await response.json();
//       const { id, client_secret, currency: responseCurrency } = data;
  
//       // Redirect to the Hosted Payment Page
//       redirectToHPP(id, client_secret, responseCurrency);
//     } catch (error) {
//       console.error('Error creating PaymentIntent:', error);
//     }
//   });