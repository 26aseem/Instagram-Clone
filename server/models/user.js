const mongoose = require ('mongoose');
const {ObjectId} = mongoose.Schema.Types


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dsjv29fpt/image/upload/v1587206552/profilepic_ag3do9.webp"
    },
    followers: [
        {type:ObjectId, ref:"User"}
    ],
    following:[
        {type:ObjectId, ref:"User"}
    ]
})

module.exports = mongoose.model("User", userSchema)