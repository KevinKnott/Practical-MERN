const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

// creates collections if it doesn't exist
mongoose.model('users', userSchema);