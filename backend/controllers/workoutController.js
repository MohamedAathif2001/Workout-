const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res)=> {
    try{
        const workouts = await Workout.find().sort({createdAt: -1});
        res.status(200).json(workouts);

    }catch(err){
        res.status(400).json(err.message);
    }
};


//get a single workout
const getWorkout = async (req, res)=> {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: "workout not found"});

    const workout = await Workout.findById(id);

    if(!workout){
        res.status(404).json({error: "workout not found"});
    }
    res.status(200).json(workout);
};


//create a new workout
const createWorkout = async (req, res)=> {
    const {title, reps, load} = req.body; 

    let emptyFields = [];
    if(!title) emptyFields.push("title");
    if(!reps) emptyFields.push("reps");
    if(!load) emptyFields.push("load");

    if(emptyFields.length > 0){
        return res.status(400).json({error: "Fill in all the forms", emptyFields})
    }

    try{
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout);

    }catch(err){
        res.status(400).json({error: err.message});
    }
};

//delete a workout
const deleteWorkout = async (req, res)=> {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: "workout not found"});

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout){
        res.status(404).json({error: "workout not found"});
    }

    //res.status(200).json({message: "workout deleted successfully"});
    res.status(200).json(workout);
}

//update a workout
const updateWorkout = async (req, res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: "workout not found"});

    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body});

    if(!workout){
        res.status(404).json({error: "workout not found"});
    }

    res.status(200).json(workout);
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}