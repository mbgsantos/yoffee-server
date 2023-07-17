const router = require('express').Router();
const Pet = require('../models/Pet.model');
const mongoose = require('mongoose');

// Create a new pet
router.post('/pets/create', async (req, res, next) => {
    const {name, breed, age, microchip, veterinary, insurance_name, diet} = req.body;
    console.log(req.body)
    try {
        const newPet = await Pet.create({
            name, breed, age, microchip, veterinary, insurance_name, diet
        });

        res.json(newPet);
    } catch (error) {
        console.log('An error occured creating a new pet.');
        next(error);
    }
});

// Retrieves all pets
router.get('/pets', async (req, res, next) => {
    try {
        const allPets = await Pet.find();
        res.json(allPets);
    } catch (error) {
        console.log('An error occured getting all pets', error);
        next(error);
    }
});

// Retrieves a specific pet by id
router.get('/pets/:id', async (req, res, next) => {
    const {id} = req.params;

    try {
        // checking if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Specified id is not valid'});
        }

        const pet = await Pet.findById(id)

        if(!pet) {
            return res.status(404).json({message: 'No project found with that id'})
        }

        res.json(pet);
    } catch (error) {
        console.log('An error occurred getting the pet', error);
        next(error);
    }
});

// Edit a specific pet
router.put('/pets/:id', async (req, res, next) => {
    const {id} = req.params;
    const {name, breed, age, microchip, veterinary, insurance_name, diet} = req.body;

    try {
        // checking if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Specified id is not valid'});
        }

        const updatedPet = await Pet.findByIdAndUpdate(id, {
            name,
            breed,
            age,
            microchip,
            veterinary,
            insurance_name,
            diet
        }, {new: true});

        if(!updatedPet) {
            return res.status(404).json({message: 'No project found with that specified id'});
        }

        res.json(updatedPet)
    } catch (error) {
        console.log('An error occured getting the pet', error);
        next(error);
    }
});

// deletes a specific pet by id
router.delete('/pets/:id', async (req, res, next) => {
    const {id} = req.params;

    try {
        // checking if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: 'Specified id is not valid'});
        }

        await Pet.findByIdAndDelete(id)
        res.json({message: `Project with id ${id} was deleted successfully`});
    } catch (error) {
        console.log('An error occurred deleting the project', error);
        next(error);
    }
});

module.exports = router;