const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DaySchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: "workouts"
    }],
});

const Day = mongoose.model("Day", DaySchema);

module.exports = Day;