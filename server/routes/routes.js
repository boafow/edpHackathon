const express = require('express');
const cors = require('cors');
const router = express.Router();
const model = require('../model/model');
router.use(cors());
//route for api/planets
router.get('/employees', async (req, res) => {
    try {
        const data = await model.Employees.find();
        res.json(data)
    } catch (err) {
        res.json(err)
    }
})


router.post('/test', (req, res) => {
    console.log(req.body);
    res.json({ success: true });
  });

router.post('/authenticate', async (req, res) => {
    const { employeeId, password } = req.body;
    console.log(req.body)
    try {
      // Find the employee with the provided employeeId
      const credentials = await model.Credentials.findOne({ employeeId });
  
      if (!credentials) {
        // Employee not found
        return res.json({ success: false, message: "Invalid employee ID" });
      }
  
      if (credentials.password !== password) {
        // Invalid password
        return res.json({ success: false, message: "Invalid password" });
      }
  
      // Authentication successful
      res.json({ success: true, employee: credentials });
    } catch (err) {
      res.json({ success: false, message: "Authentication failed" });
    }
  });
  

module.exports = router;