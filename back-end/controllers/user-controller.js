import express from 'express';
import UserData from '../models/user-model.js';
import OwnTrainingData from '../models/own-training.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

export const login = async (req, res) => {
  const body = req.body;

  const user = await UserData.findOne({ email: body.email });

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid email or password',
    });
  }

  const userForToken = {
    username: user.name,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, name: user.name, email: user.email, isProfessional: user.isProfessional });
};

export const register = async (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const isProfessional = req.body.isProfessional;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUserData = new UserData({
    name: name,
    lastname: lastname,
    email: email,
    passwordHash,
    isProfessional: isProfessional,
  });

  try {
    await newUserData.save();
    res.status(201).json(newUserData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const readData = async (req, res) => {
  OwnTrainingData.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

export const readProfile = async (req, res) => {
  UserData.findOne({email: req.body.email}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

export const insertNewTrainingData = async (req, res) => {
  const name = req.body.name;
  const pvm = req.body.pvm;
  const laji = req.body.laji;
  const suoritukset_yht = req.body.suoritukset_yht;
  const paino = req.body.paino;
  const isProfessional = req.body.isProfessional;

  //Search user by decoded token id
  const user = await UserData.findById(req.user)

  const newdata = new OwnTrainingData({
    name: name,
    pvm: pvm,
    laji: laji,
    suoritukset_yht: suoritukset_yht,
    paino: paino,
    isProfessional: isProfessional,
    user: user._id
  });
  try {
    await newdata.save();
    res.send('inserted new training data');
  } catch (err) {
    console.log(err);
  }
};

export const deleteTrainingData = async (req, res) => {
  
  const id = req.params.id;
  const entry = await OwnTrainingData.findById(req.params.id)
  const userID = entry.user.toString()

  //If token does not exist or doesn't include id, it will cause error
  if (!req.token || !req.user) { 
    console.log("token missing or invalid")  
    return res.status(401).json({ error: 'token missing or invalid' })  
  }

  //Checks if user is authorized to remove the blog
  if (userID !== req.user) {  
    console.log("not authorized to remove this blog")    
    return res.status(401).json({ error: 'not authorized to remove this blog' })  
  }

  await OwnTrainingData.findByIdAndDelete(id).exec();
  id;
  res.status(204).end();
};

export const editTraining = async (req, res) => {
  const id = req.body.id;
  const pvm = req.body.pvm;
  const laji = req.body.laji;
  const suoritukset_yht = req.body.suoritukset_yht;
  const paino = req.body.paino;

  try {
    await OwnTrainingData.findById(id, (err, updatedTraining) => {
      updatedTraining.pvm = pvm;
      updatedTraining.laji = laji;
      updatedTraining.suoritukset_yht = suoritukset_yht;
      updatedTraining.paino = paino;
      updatedTraining.save();
      res.send('update');
    });
  } catch (err) {
    console.log(err);
  }
};

export default router;
