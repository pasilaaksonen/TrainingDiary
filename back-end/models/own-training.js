import mongoose from 'mongoose';

const ownTrainingSchema = mongoose.Schema({
   name: String,
   pvm: String,
   laji: String,
   suoritukset_yht: Number,
   paino: Number,
   isProfessional: Boolean,
});

const OwnTrainingData = mongoose.model('owntrainingdata', ownTrainingSchema);
//
export default OwnTrainingData;