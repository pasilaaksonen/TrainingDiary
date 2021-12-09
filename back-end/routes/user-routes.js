import express from 'express';
import {
  login,
  register,
  readData,
  readProfile,
  insertNewTrainingData,
  deleteTrainingData,
  editTraining,
} from '../controllers/user-controller.js';

const router = express.Router();

router.post('/login', login);
router.get('/result/amateurs', readData);
router.post('/result/profile', readProfile);
router.post('/addnew', insertNewTrainingData);
router.delete('/delete/:id', deleteTrainingData);
router.put('/update', editTraining);
router.post('/register', register);

export default router;
