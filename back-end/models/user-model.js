import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   lastname: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   passwordHash: {
      type: String,
      required: true
   },
   isProfessional: {
      type: Boolean,
      required: true
   },
});

const UserData = mongoose.model('userdata', userSchema);

export default UserData;