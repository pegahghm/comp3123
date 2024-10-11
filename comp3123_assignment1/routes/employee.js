const express = require('express');
const { body, validationResult } = require('express-validator');
const Employee = require('../models/Employee');
const router = express.Router();


router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/employees', [
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').isEmail(),
    body('position').notEmpty(),
    body('salary').isNumeric(),
    body('date_of_joining').isDate(),
    body('department').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    try {
        const employee = new Employee({
            first_name, last_name, email, position, salary, date_of_joining, department
        });
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.put('/employees/:eid', [
    body('position').optional().notEmpty(),
    body('salary').optional().isNumeric()
], async (req, res) => {
    const updates = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, updates, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete employee
router.delete('/employees', async (req, res) => {
    const { eid } = req.query;
    try {
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
