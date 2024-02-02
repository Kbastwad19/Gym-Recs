const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose"); 

app.use(cors({
    origin: 'http://localhost:8000', //created a local server for html using PORT 8000
    credentials: true,
}));

mongoose.connect("//your mongoDb URL", { useNewUrlParser: true, useUnifiedTopology: true }); 

const User = mongoose.model("New_Gym_App", {
    workoutType: String, 
    exercise: String,
    weight: String,
    sets: String,
});

app.use(express.json());

app.post('/data', function (req, res) {
    try {
        const { workoutType, exercise, weight, sets } = req.body;

        const newData = new User({
            workoutType: workoutType, 
            exercise: exercise,
            weight: weight,
            sets: sets,
        });

        newData.save();
        res.json({ message: "Success" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server Error' }); 
    }
});

app.get('/data', function (req, res) {
    const workout = req.query.workoutType; 
    const exercise = req.query.exercise;
    const weight = req.query.weight;
    const sets = req.query.sets;

    res.json({
        workoutType: workout, 
        exercise: exercise,
        weight: weight,
        sets: sets
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
