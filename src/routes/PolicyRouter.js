/**
 * Routing file
 * Defines how data is being fetched using vaious endpoints
 */

const express = require('express');
const routing = express.Router();
const db = require('../model/InsuranceCustomerDbSetup');
const CSVToJSON = require('csvtojson');
const PolicyService = require('../service/policy_service');
const CustomerData = require('../model/CustomerData');
const csvUrl = 'src/utilities/Data/dataset.csv';

/**
 * 1.)
 * Used to Store CSV File data in the mongodb server
 * Returns success msg if setup correctly with status code 200
 * Returns error msg with status code 500*/
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
        next(err);
    });
})


/**
 * 2.)
 * Just to return some response to check whether servers are running properly or not 
 * */
routing.get('/' , (req,res) => {
    res.json({'message' : "Policy server is up and running!"});
})


/**
 * 3.)
 * Takes id as params and returns that policy details
 * Returns the policy details of that particular Id with status code 200
 * Returns error msg with status code 404*/
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

/**
 * 4.)
 * Gets number of policies sold/month in a particular region
 * Takes region name as input  
 * Returns the number of policies sold/month for all the 12 months with status code 200
 * Returns error msg with status code 404*/
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

/**
 * 4.)
 * Used to update the premium value in the database
 * Returns success message with status code 200 when successfully updated
 * Returns fail message with status code 400 when not updated
 * Takes policyId as input  
 * Returns error msg with status code 404*/
routing.put( '/updatePolicyDetails/:policyId', (req, res, next) =>{
    const policyId = req.params.policyId;
    const data = req.body.data;
    const { premiumAmount } = data; 
    PolicyService.updatePolicyDetails(policyId, premiumAmount)
    .then(message=>res.json({"message" : message}))
    .catch(err=>next(err))
} )

/**
 * 5.)
 * Used to get all the Unique regions present in the record right now
 * Returns an object with Unique regions presemt in the current record
 * Returns error msg with status code 400*/
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
