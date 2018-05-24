
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    isGold: Boolean,
    phone: String
});

const Customer = mongoose.model('Customer', customerSchema);

router.post('/', async (req, res) => {
    const {error} = validateCustomer(req.body);
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


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().required().min(5),
        isGold: Joi.bool(),
        phone: Joi.string()        
    };

    return Joi.validate(customer, schema);
}

module.exports = router;