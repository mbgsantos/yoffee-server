const { Schema, model } = require("mongoose");

const activitySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required.'],
            unique: true,
        },
        address: {
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            country: {
                type: String,
            },
        },
    }
)

const Activity = model("Activity", activitySchema);

module.exports = Activity;