const router = require('express').Router();
const Activity = require('../models/Activity.model');
const mongoose = require('mongoose');

// Create a new activity
router.post('/activities/create', async (req, res, next) => {
    const {name, description, address} = req.body;

    try {
        const newActivity = await Activity.create({
            name, description, address
        });

        res.json(newActivity);
    } catch (error) {
        console.log('An error occurred creating a new Activity');
        next(error);
    }
});

// Retrieves all activities
router.get('/activities', async (req, res, next) => {
    try {
        const allActivities = await Activity.find();
        res.json(allActivities)
    } catch (error) {
        console.log('An error occured getting all activities', error);
        next(error);
    }
});

// Retrieves a specific activity by id
router.get('/activities/:id', async (req, res, next) => {
    const {id} = req.params;

    try {
        // check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Specified id is not valid'});
        }

        const activity = await Activity.findById(id);

        if(!activity) {
            return res.status(404).json({message: 'No activity found with that id'})
        }

        res.json(activity);
    } catch (error) {
        console.log('An error occurred getting the project', error);
        next(error);
    }
});

// Edits a specific activity by id
router.put('/activities/:id', async (req, res, next) => {
    const {id} = req.params;
    const {name, description, address} = req.body;

    try {
        // check if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Specified id is not valid'});
        }

        const updatedActivity = await Activity.findByIdAndUpdate(id, {
            name,
            description,
            address
        }, {new: true});

        if (!updatedActivity) {
            return res.status(404).json({message: 'No activity found with that specified id'});
        }

        res.json(updatedActivity)
    } catch (error) {
        console.log('An error occurred getting the activity', error);
        next(error);
    }
});

// deletes a specific activity by id
router.delete('/activities/:id', async (req, res, next) => {
    const {id} = req.params;

    try {
        // check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Specified id is not valid'});
        }

        await Activity.findByIdAndDelete(id)
        res.json({message: `Project with id ${id} was deleted successfully`});
    } catch (error) {
        console.log(error);
        console.log('An error occurred deleting the project', error)
        next(error);
    }
});

module.exports = router;