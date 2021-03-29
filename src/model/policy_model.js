/**
 * Policy Model File
 * Deals with all database queries and all database related stuff
 */
const collection = require('../utilities/connection');
let PolicyModel = {};

/**
 * 1.) Gets Policy Details :-
 * Takes in CustomerId/PolicyId as input and returns the details for that Id.
*/
PolicyModel.getPolicyDetails = (id) =>{
    return collection.getInsuranceCustomerCollection()
    .then(insuranceCollection=>{
        return insuranceCollection.findOne({$or:[
            { policyId : id },
            { customerId : id}
        ]} , { _id : 0 } )
        .then(data=>data)
    }).catch(err=>next(err))
}

/**
 * 2.) Takes a region as an Input and fetches the number of policies/month in that region.
*/
PolicyModel.getPoliciesOfRegion = (region) =>{
    return collection.getInsuranceCustomerCollection()
    .then(insuranceCollection=>{
        return insuranceCollection.find( { customerRegion : region } , { _id : 0, monthOfPurchase : 1, dateOfPurchase : 1 } )
        .then(policies=>policies)
    }).catch(err=>next(err))
}

/**
 * 3.) Takes a policy-id as input and updates the premium value in the DB
*/
PolicyModel.updatePolicyDetails = (policyId, premiumAmount) =>{
    return collection.getInsuranceCustomerCollection()
    .then(insuranceCollection=>{
        return insuranceCollection.updateOne({ "policyId" : policyId }, { $set : { "premiumAmount" : premiumAmount } })
        .then(result=>{
            if(result&&result.nModified) return 1;
            else return 0;
        })
    }).catch(err=>next(err))
}

/**
 * 4.) Returns all the Unique regions present in the record
*/
PolicyModel.getAllRegions = () =>{
    return collection.getInsuranceCustomerCollection()
    .then(insuranceCollection=>{
        return insuranceCollection.find()
        .then(result=>result)
    }).catch(err=>next(err))
}
module.exports = PolicyModel;