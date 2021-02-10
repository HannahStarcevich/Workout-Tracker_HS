const {
    kStringMaxLength
} = require("buffer");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DaySchema = new Schema({
    name: String,

    workouts: [{
        type: Schema.Types.ObjectId,
        ref: "workouts"
    }],
});

const Day = mongoose.model("Day", DaySchema);

module.exports = Day;