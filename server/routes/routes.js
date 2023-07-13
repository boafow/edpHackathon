const express = require('express');
const router = express.Router();
const model = require('../model/model');

//route for api/planets
router.get('/employees', async (req, res) => {
    try {
        const data = await model.Employees.find();
        res.json(data)
    } catch (err) {
        res.json(err)
    }
})

module.exports = router;