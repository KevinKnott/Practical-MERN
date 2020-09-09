const express = require('express');
require('dotenv').config();
require('./models/User');
require('./services/passport');


const mongoose = require('mongoose');

const uri =
    'mongodb+srv://' +
    process.env.ATLAS_USER +
    ':' +
    process.env.ATLAS_PASS +
    '@first-cluster.r9nhd.mongodb.net/' +
    process.env.ATLAS_DB +
    '?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, function (err) {
    if (err) {
        console.log("Unable to connect to DB", err);
    } else {
        console.log("Connected to DB");
    }
});

const app = express();
require('./routes/authRoutes')(app);

// app.get("/", (req, res) => {
//     res.send({ hi: 'there' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);