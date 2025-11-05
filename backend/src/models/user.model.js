import mongoose from "mongoose";
import  passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
username:{
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
  
    registeredSubjects: [{
  type: Schema.Types.ObjectId,
  ref: "Subject"
}]
},
    { timestamps: true }
)
userSchema.plugin(passportLocalMongoose,{
    usernameField: 'email'
});
const User=mongoose.model("User",userSchema)

export default User;