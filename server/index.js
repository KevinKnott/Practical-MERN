const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();
require('./models/User');
require('./services/passport');



const uri =
    'mongodb+srv://' +
    process.env.ATLAS_USER +
    ':' +
    process.env.ATLAS_PASS +
    process.env.ATLAS_CLUSTER +
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
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);

// app.get("/", (req, res) => {
//     res.send({ hi: 'there' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// const fetchAlbums = async () => {
//     const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
//     const json = await res.json();

//     console.log(json);
// };

// async function fetchAlbums() {
//     const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
//     const json = await res.json();

//     console.log(json);
// }
// // function fetchAlbums() {
// //     fetch('https://rallycoding.herokuapp.com/api/music_albums')
// //         .then(res => res.json())
// //         .then(json => console.log(json));
// // }


// fetchAlbums();