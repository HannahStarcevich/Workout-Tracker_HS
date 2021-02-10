const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workoutdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

app.get("/", (req, res) => {
    res.sendFile('./index')
});

// View Data
app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout)
    }).catch(err => {
        res.json(err);
    });
});

app.get("/api/days", (req, res) => {
    db.Day.find({}).then(dbDay => {
        res.json(dbDay)
    }).catch(err => {
        res.json(err);
    });
});


// Seed Data

const seedWorkouts = [{
        name: "Monday morning run",
        type: "cardio exercise",
        weight: 0,
        sets: 0,
        reps: 0,
        duration: 60,
        distance: 6
    },
    {
        name: "Monday afternoon lift",
        type: "weight lift exercise",
        weight: 100,
        sets: 4,
        reps: 25,
        duration: 60,
        distance: 0
    },
    {
        name: "Short run",
        type: "cardio exercise",
        weight: 0,
        sets: 0,
        reps: 0,
        duration: 20,
        distance: 2.5
    },
    {
        name: "Kick boxing",
        type: "strength and conditioning exercise",
        weight: 15,
        sets: 4,
        reps: 20,
        duration: 60,
        distance: 0
    }
]

app.get('/seedWorkouts', (req, res) => {
    db.Workout.create(seedWorkouts)
        .then(result => {
            console.log(result)
            db.Day.create([{
                        name: 'day 1',
                        workouts: [
                            result[Math.floor(Math.random() * result.length)]._id,
                        ]
                    },
                    {
                        name: 'day 2',
                        workouts: [
                            result[Math.floor(Math.random() * result.length)]._id,
                        ]
                    },
                    {
                        name: 'day 3',
                        workouts: [
                            result[Math.floor(Math.random() * result.length)]._id
                        ]
                    },
                    {
                        name: 'day 4',
                        workouts: [
                            result[Math.floor(Math.random() * result.length)]._id
                        ]
                    },
                    {
                        name: 'day 5',
                        workouts: [
                            result[Math.floor(Math.random() * result.length)]._id,
                            result[Math.floor(Math.random() * result.length)]._id,
                        ]
                    },

                ])
                .then(fullRes => {
                    // console.log(fullRes)
                    res.json(fullRes)
                })
                .catch(err => {
                    res.json(err)
                })
        })
        .catch(err => {
            // console.log(err)
            res.json(err)
        })
})

app.get('/populatedworkouts', (req, res) => {
    db.Day.find({})
        .populate('workouts')
        .then(dbDay => {
            res.json(dbDay)
        })
        .catch(err => {
            console.log(err)
            res.send(err);
        })
})

app.post('/api/days', ({
    body
}, res) => {
    db.Day.create(body)
        .then(dbDay => {
            res.json(dbDay)
        })
        .catch(err => {
            console.log(err)
            res.send(err);
        })
})

app.post('/api/workouts', (req, res) => {
    console.log(req.body);

    db.Workout.create(req.body)
        .then(dbWorkout => {
            db.Week.findOneAndUpdate({
                    _id: req.body.weekId
                }, {
                    $push: {
                        workouts: dbWorkout._id
                    }
                })
                .then(dbDay => res.send(dbDay))
        })
        .catch(err => res.json(err))

})

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});