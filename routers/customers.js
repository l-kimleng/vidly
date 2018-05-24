
const express = require('express');
const mongoose = require('mongoose');
const {Customer, validate } = require('../models/customer');
const router = express.Router();

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const customer = await createCustomer(req.body);
        if(!customer) res.status(500).send('Unable to save customer.'); 
        res.send(customer);
    }catch(err) {
        res.status(400).send(err.message);
    }   
});

async function createCustomer(customer) {
    try{
        const saveCustomer = new Customer({
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        });
        return await saveCustomer.save();
    }catch(err) {
        throw err;
    }
}

module.exports = router;