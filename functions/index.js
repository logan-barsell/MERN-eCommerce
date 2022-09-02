const functions = require("firebase-functions");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI).then(() => console.log('db connection successful')).catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/carts', cartRoute);
app.use('/orders', orderRoute);
app.use('/checkout', stripeRoute);

const main = express();
main.use('/api', app);

exports.main = functions.https.onRequest(main);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// });







// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
