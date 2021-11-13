import express from 'express';
import UserData from '../models/user-model.js';
import TrainerData from '../models/trainer-model.js';
import OwnTrainingData from '../models/own-training.js'

// export const login = async (req, res) => {

//    const email = req.body.email;
//    const password = req.body.password;
 
// }
//
const router = express.Router();

export const register = async (req, res) => {

    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const isProfessional = req.body.isProfessional;

    const newUserData = new UserData({ name: name, lastname: lastname, email: email, password: password, isProfessional: isProfessional });

    try {
        await newUserData.save();
        res.status(201).json(newUserData);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getData = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    console.log(email)
    console.log(password)

    UserData.find({}, (err, result) => {

        let userAccount = result.filter(user => user.email === email);
        console.log(userAccount)

        if (!userAccount) {
            console.log("Tunnus väärin?")
            res.send("Kirjautuminen epäonnistui")
            return;
        } if (password !== userAccount[0].password) {
            console.log("Salasana Väärin?")
            res.send("Kirjautuminen epäonnistui")
            return;
        } else {
        const sendItems = [];
        sendItems.push(result[0].name);
        sendItems.push(result[0].isProfessional);
        console.log("kaikki ok")
        res.send(sendItems);
        }
    })
}


export const readData = async (req, res) => {

    OwnTrainingData.find({}, (err, result) => {
        console.log(result.data)
        if (err) {
           res.send(err) 
        }
        res.send(result);
    })
}

export const readData2 = async (req, res) => {

    TrainerData.find({}, (err, result) => {
        console.log(result.data)
        if (err) {
           res.send(err) 
        }
        res.send(result);
    })
}


export const readData3 = async (req, res) => {

    OwnTrainingData.find({}, (err, result) => {
        if (err) {
           res.send(err) 
        }
        res.send(result);
    })
}

export const insertNewTrainingData = async (req, res) => {

    const name = req.body.name;
    const pvm = req.body.pvm;
    const laji = req.body.laji;
    const suoritukset_yht = req.body.suoritukset_yht;
    const paino = req.body.paino;
    const isProfessional = req.body.isProfessional;


    const newdata = new OwnTrainingData({ name: name, pvm: pvm, laji: laji, suoritukset_yht: suoritukset_yht, paino: paino, isProfessional: isProfessional });
    try {
        await newdata.save();
        res.send("inserted new training data")
    } catch(err) {
        console.log(err)
    } 
};

export const deleteTrainingData = async (req, res) => {
    
    const id = req.params.id;
    await OwnTrainingData.findByIdAndDelete(id).exec();
    (id);
    res.send("deleted")  
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
            res.send("update")
        })
    } catch(err) {
        console.log(err)
    } 
}

export default router;