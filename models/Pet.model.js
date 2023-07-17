const { Schema, model } = require("mongoose");

const petSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        breed: {
            type: String,
            required: [true, 'Type of breed is required'],
        },
        age: {
            type: Number,
        },
        microchip: {
            type: String,
        },
        veterinary: {
            name: {
                type: String,
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
        },
        insurance_name: {
            type: String,
        },
        diet: {
            type: String,
        },
    }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;