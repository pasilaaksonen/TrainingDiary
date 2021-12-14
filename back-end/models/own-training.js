import mongoose from 'mongoose';

const ownTrainingSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   pvm: {
      type: String,
      required: true
   },
   laji: {
      type: String,
      required: true
   },
   suoritukset_yht: {
      type: Number,
      required: true
   },
   paino: {
      type: Number,
      required: true
   },
   isProfessional: {
      type: Boolean,
      required: true
   },
   user: {    
      type: mongoose.Schema.Types.ObjectId,    
      ref: 'userdata'  
    }
});

const OwnTrainingData = mongoose.model('owntrainingdata', ownTrainingSchema);

export default OwnTrainingData;