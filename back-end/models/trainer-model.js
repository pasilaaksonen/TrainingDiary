import mongoose from 'mongoose';

const trainerSchema = mongoose.Schema({
   pmv: String,
   suoritukset_yht: Number,
   suorittaja_lkm: Number,
   isProfessional: Boolean,
});

const TrainerData = mongoose.model('trainingdata', trainerSchema);

export default TrainerData;