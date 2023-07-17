const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
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

const Service = model("Service", serviceSchema);

module.exports = Service;