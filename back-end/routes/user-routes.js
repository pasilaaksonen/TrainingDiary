import express from 'express';
import {
  login,
  register,
  readData,
  readData2,
  readData3,
  readProfile,
  insertNewTrainingData,
  deleteTrainingData,
  editTraining,
} from '../controllers/user-controller.js';

const router = express.Router();

router.post('/login', login);
// router.post('/read', getData);
router.get('/result/amateurs', readData);
router.get('/result/professionals', readData2);
router.get('/result/omat', readData3);
router.get('/result/profile', readProfile);
router.post('/addnew', insertNewTrainingData);
router.delete('/delete/:id', deleteTrainingData);
router.put('/update', editTraining);
router.post('/register', register);

export default router;
