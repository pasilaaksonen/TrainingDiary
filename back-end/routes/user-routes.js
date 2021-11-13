import express from 'express';
import { register, getData, readData, readData2, readData3, insertNewTrainingData, deleteTrainingData, editTraining } from '../controllers/user-controller.js';

const router = express.Router();

// router.post('/login', usersControllers.login);
router.post('/register', register);
router.post('/read', getData);
router.get('/result/amateurs', readData)
router.get('/result/professionals', readData2)
router.get('/result/omat', readData3)
router.post('/addnew', insertNewTrainingData)
router.delete('/delete/:id', deleteTrainingData)
router.put('/update', editTraining);

export default router;