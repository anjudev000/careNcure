const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: {
        type: String,
        required: true,
    },
    mobile_num:{
        type: String,
        required: true,
        unique: true
      }
    ,
    email:{
        type:String,
        required:true,
        unique:true
       },
     password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be atleast 6 character long']
    },
    profilePic: {
        type: String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9-tH5rGjOoip0aJSXbSgRf_5H4mtOlNJvIRihbjg&s'
    },
    gender:{
        type: String
    },
    dob:{
        type: Date
    },
    bloodGroup:{
        type: String
    },
    address : [{
        houseName: {type: String},
        houseNumber: {type: Number,},
        street: {type: String},
        city: {type: String},
        state: {type: String},
        pincode : {type: Number}
     }],
    isblock: {
        type: Boolean,
        default:false
    },
    saltSecret: String
});
// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
// //Phone number validation regular expression
const phoneRegex = /^[0-9]{10}$/; 
userSchema.path('mobile_num').validate((val) => {
    return phoneRegex.test(val);
}, 'Invalid phone number.');

// // Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


module.exports = mongoose.model('User',userSchema);