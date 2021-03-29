/**
 * Service File :-
 * Service to create errors and do all kinds of validations on returned data/received data
 * */
const PolicyModel = require('../model/policy_model');
let PolicyService = {};

/**
 * 1.)
 * Service to create errors and do all kinds of validations on returned Policy details
 * */
PolicyService.getPolicyDetails = ( id ) =>{
    return PolicyModel.getPolicyDetails(id)
    .then(details=>{
        //CASE 1 :- If gets details return details as it is
        if(details) return details;
        //CASE 2 :- else returns error with no Policy found
        else{
            let e = new Error();
            e.message = `No Policy Record found with Policy/Customer Id ${id}`;
            e.status = 404;
            throw e;
        }
    })
}

/**
 * 2.)
 * Service to create errors and do all kinds of validations on returned policies/month per region
 * */
PolicyService.getPoliciesOfRegion = ( region ) =>{
    return PolicyModel.getPoliciesOfRegion(region)
    .then(policies=>{
        //CASE 1 :- If data present, create an object with number of policies/month
        if(policies&&policies.length>0){
            const policiesPerRegion = {0 : 0,1 : 0,2 : 0,3 : 0,4 : 0,5 : 0,6 : 0,7 : 0,8 : 0,
                9 : 0,10 : 0,11 : 0};
            for( const p of policies){
                policiesPerRegion[p.monthOfPurchase]++;
            }
            return policiesPerRegion;
        }
        //CASE 2 :- else return msg that no such data present in the records
        else{
            let e = new Error();
            e.message = `No policy from ${region} region exists in records`;
            e.status = 404;
            throw e;
        }
    })
}

/**
 * 3.)
 * Service to create errors and do all kinds of validations on whether policy updated or not
 * */
PolicyService.updatePolicyDetails = (policyId, premiumAmount) =>{
    return PolicyModel.updatePolicyDetails(policyId, premiumAmount)
    .then(result=>{
        //CASE 1 :- Return success message if data successfully updated in the records
        if(result){
            return `Successfully Updated the details for Policy-Id ${policyId}`;
        }
        //CASE 2 :- Return error message if data not updated successfully in the records
        else{
            let e = new Error();
            e.status = 400;
            e.message = `Policy Id ${policyId} details coudn't be updated due to internal error`;
            throw e;
        }
    })
}

/**
 * 4.)
 * Service to create errors and do all kinds of validations on all unique regions returned
 * */
PolicyService.getAllRegions = () =>{
    return PolicyModel.getAllRegions()
    .then(data=>{
        const regions = {}
        for( p of data){
            if(!regions[p.customerRegion]) regions[p.customerRegion] = 1
        }
        return regions;
    })
}



module.exports = PolicyService;