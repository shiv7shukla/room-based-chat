import { model, Schema } from "mongoose";

const UserSchema=new Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:String,
    rooms:[String],
    isOnline:Boolean
});

export const UserModel=model("users", UserSchema);