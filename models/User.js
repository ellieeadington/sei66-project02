const mongoose = require('mongoose')


const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        minlength: [3],
        maxlength: [99]
    },
    lastName: {
        required: true,
        type: String,
        minlength: [3],
        maxlength: [99]
    },
        
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true

    },
 password: {
        type: String,
        required: true,
        minlenth:[6]
    },

    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],

    profileType: String,
    image: String,

},
{
    timestamps: true
});





const  User = mongoose.model("User", userSchema)

module.exports = {User}
