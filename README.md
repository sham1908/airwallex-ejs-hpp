This is the integration of Airwallex Hosted Payment Page

The Hosted Payment Page is a solutions provided by Airwallex to facilitate payments

### How to run the app
1. On the home directory create an .env file and the following variables:

   a. AIRWALLEX_API_KEY
   b. AIRWALLEX_CLIENT_ID
   c. AIRWALLEX_API="https://api-demo.airwallex.com"
   d. AIRWALLEX_PCI_API="https://pci-api-demo.airwallex.com"

 2. run `npm install` to install the dependencies
 3. run `npx nodemon index.js` to start the app



### Hosted Payment Page

1. **Hosted by Airwallex**: The Hosted Payment Page is a standalone page hosted by Airwallex. When you use this option, your users are redirected to a separate page provided by Airwallex to complete the payment process.
   
2. **Redirects Users**: You need to redirect users to this external page. This can be beneficial if you prefer not to handle any payment form and its security aspects within your application.

3. **Less Customization**: Since the page is hosted by Airwallex, you have less control over the design and customization of the payment experience.

4. **Simpler Integration**: It requires less integration work on your part because Airwallex handles the entire payment process, including form rendering and security.


### Use Cases

- **Hosted Payment Page**: Ideal for businesses that want a quick and simple integration without handling payment form security. It's also useful for businesses that are less concerned about customizing the payment experience.
  
- **Drop-in Element**: Suitable for businesses that want a seamless and integrated payment experience on their website, with more control over the user interface and experience.

Both methods ensure secure handling of payment data as they utilize iframes or redirection to Airwallex's secure servers, minimizing the security burden on your application.


