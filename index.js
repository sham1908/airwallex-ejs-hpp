require('dotenv').config(); // Loads environment variables from a .env file into process.env
const express = require('express') //imports the express framework
const axios = require('axios'); //import axios for making HTTP requests
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique request IDs


const app = express() //initializes an express application 

app.use(express.json()); // Parse JSON request bodies

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies


app.set('view engine', 'ejs') // Sets EJS as the templating engine

const AIRWALLEX_API_KEY = process.env.AIRWALLEX_API_KEY;
const AIRWALLEX_CLIENT_ID = process.env.AIRWALLEX_CLIENT_ID;
const AIRWALLEX_API = process.env.AIRWALLEX_API;
const RETURN_URL = "http://www.success.com"; // Replace with your actual return URL

// Helper function to get Airwallex token
const getToken = async () => {
    const response = await axios.post(`${process.env.AIRWALLEX_API}/api/v1/authentication/login`, {}, {
        headers: {
            'x-client-id': process.env.AIRWALLEX_CLIENT_ID,
            'x-api-key': process.env.AIRWALLEX_API_KEY,
            'Content-Type': 'application/json'
        }
    });
    return response.data.token;
};

app.get('/', (req, res) => {
    res.render('index.ejs')  // Renders the 'index.ejs' template when the root URL is accessed
})

app.post('/checkout', (req, res) => {
    res.render('checkout.ejs'); // Renders the 'checkout.ejs' template when the form is submitted
});

app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const token = await getToken();
        const response = await axios.post(`${AIRWALLEX_API}/api/v1/pa/payment_intents/create`, {
            request_id: uuidv4(),
            amount,
            currency,
            merchant_order_id: `Merchant_Order_${uuidv4()}`,
            return_url: RETURN_URL,
            customer_id: "cus_hkdmcd947gy5myb26jd", //Add the customer_id if you want to save the details
            //add the followint to go through 3DS
            payment_method_options: {
                card: {
                    three_ds_action: "FORCE_3DS"
                }
            }
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const { id, client_secret } = response.data;
        res.json({ id, client_secret, currency }); // Return the necessary data as JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating PaymentIntent');
    }
});

// app.post('/create-payment-intent', async (req, res) => {
//     const { amount, currency } = req.body;
//     try {
//         const token = await getToken();
//         const response = await axios.post(`${AIRWALLEX_API}/api/v1/pa/customers/create`, {
//             request_id: uuidv4(),
//             merchant_customer_id: `Merchant_${uuidv4()}`,
//             first_name: "first",
//             last_name: "last",
//             email: "test@airwallex.xom",
//             phone_number: "090909909"
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//         const { id } = response.data;

//         const clientSecretResponse = await axios.get(`${AIRWALLEX_API}/api/v1/pa/customers/${id}/generate_client_secret`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         const clientSecret = clientSecretResponse.data.client_secret;
//         console.log(clientSecret);

//         res.json({ id, clientSecret, currency }); // Return the necessary data as JSON
//         console.log(id)
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error creating PaymentIntent');
//     }
// });


app.get('/complete', (req, res) => {
    res.send('your payment was successful')
})

app.get('/cancel', (req, res) => {
    res.redirect('/')
})

app.listen(3000, () => console.log('Server started on port 3000')) //starts the server on port 3000




