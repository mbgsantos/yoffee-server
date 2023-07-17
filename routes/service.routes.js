const router = require('express').Router();
const Service = require('../models/Service.model');
const mongoose = require('mongoose');

// Create a new service
router.post('/services/create', async (req, res, next) => {
    const {name, address} = req.body;

    try {
        const newService = await Service.create({
            name, address
        });

        res.json(newService);
    } catch (error) {
        console.log('An error occurred creating a new service');
        next(error);
    }
});

// Retrieves all services
router.get('/services', async (req, res, next) => {
    try {
        const allServices = await Service.find();
        res.json(allServices)
    } catch (error) {
        console.log('An error occurred getting all services', error);
        next(error);
    }
});

// Retrieves a specific project by id
router.get('/services/:id', async (req, res, next) => {
    const {id} = req.params;

    try {
        // check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Specified id is not valid'});
        }

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({message: 'No service found with that id'})
        }

        res.json(service);
    } catch (error) {
        console.log('An error occurred getting the service', error);
        next(error);
    }
});

// Edits a specific service
router.put('/services/:id', async (req, res, next) => {
    const {id} = req.params;
    const {name, address} = req.body;

    try {
        // check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Specified id is not valid'});
        }

        const updatedService = await Service.findByIdAndUpdate(id, {
            name,
            address
        }, {new: true});

        if (!updatedService) {
            return res.status(404).json({message: 'No project found with that specified id'});
        }

        res.json(updatedService)
    } catch (error) {
        console.log('An error occurred getting the project', error);
        next(error);
    }
});

// deletes a specified service
router.delete('/services/:id', async (req, res, next) => {
    const {id} = req.params;

    try {
        // check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Specified id is not valid'});
        }

        await Service.findByIdAndDelete(id)
        res.json({message: `Project with id ${id} was deleted successfully`});
    } catch (error) {
        console.log('An error occurred deleting the project', error)
        next(error);
    }
});

module.exports = router;