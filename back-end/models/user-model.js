import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
   name: String,
   lastname: String,
   email: String,
   password: String,
   isProfessional: Boolean,
});

const UserData = mongoose.model('userdata', userSchema);
//
export default UserData;