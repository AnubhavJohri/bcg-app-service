const express = require('express');
const routing = express.Router();
const db = require('../model/InsuranceCustomerDbSetup');
const CSVToJSON = require('csvtojson');
const PolicyService = require('../service/policy_service');
const CustomerData = require('../model/CustomerData');
const csvUrl = 'src/utilities/Data/dataset.csv';

//1.)
//Used to Setup Dummy data for testing
routing.get('/setupdb' , (req ,res ,next) => {
    CSVToJSON().fromFile(csvUrl)
    .then( customers => {
        const customerData = [];
        customers.forEach( data =>{
            const eachCustomer = new CustomerData(data);
            customerData.push(eachCustomer); 
        });
            db.setupDb(customerData).then(result=>{
            res.json({'message':result})
        });
    }).catch(err => {
        // log error if any
        next(err);
    });
})


//2.)
//DUMMY FUNCTIONALITY 
//to test whether functionality is active
routing.get('/' , (req,res,next) => {
    res.json({'message' : "Policy server is up and running!"});
})


routing.get('/getPolicy/:id' , (req,res,next) => {
    const id = req.params.id;
    PolicyService.getPolicyDetails(id)
    .then(polidyDetails=>{
        res.json({"data":polidyDetails});
    })
    .catch(err=>{
        next(err);
    })
})

routing.get('/getPoliciesOfRegion/:region' , (req,res,next) => {
    const region = req.params.region.toLowerCase();
    PolicyService.getPoliciesOfRegion(region)
    .then(policies=>{
        res.json({"data":policies});
    })
    .catch(err=>{
        next(err);
    })
})

routing.put( '/updatePolicyDetails/:policyId', (req, res, next) =>{
    const policyId = req.params.policyId;
    const data = req.body.data;
    const { premiumAmount } = data; 
    PolicyService.updatePolicyDetails(policyId, premiumAmount)
    .then(message=>res.json({"message" : message}))
    .catch(err=>next(err))
} )

routing.get('/getAllRegions' , (req,res,next) => {
    PolicyService.getAllRegions()
    .then(regions=>{
        res.json({"data":regions});
    })
    .catch(err=>{
        next(err);
    })
})


module.exports = routing;
