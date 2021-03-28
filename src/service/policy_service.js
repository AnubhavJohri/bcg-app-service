const PolicyModel = require('../model/policy_model');

let PolicyService = {};

PolicyService.getPolicyDetails = ( id ) =>{
    return PolicyModel.getPolicyDetails(id)
    .then(details=>{
        if(details) return details;
        else{
            let e = new Error();
            e.message = `No Policy Record found with Policy/Customer Id ${id}`;
            e.status = 404;
            throw e;
        }
    })
}

PolicyService.getPoliciesOfRegion = ( region ) =>{
    return PolicyModel.getPoliciesOfRegion(region)
    .then(policies=>{
        if(policies&&policies.length>0){
            const policiesPerRegion = {0 : 0,1 : 0,2 : 0,3 : 0,4 : 0,5 : 0,6 : 0,7 : 0,8 : 0,
                9 : 0,10 : 0,11 : 0};
            for( const p of policies){
                policiesPerRegion[p.monthOfPurchase]++;
            }
            return policiesPerRegion;
        }
        else{
            let e = new Error();
            e.message = `No policy from ${region} region exists in records`;
            e.status = 404;
            throw e;
        }
    })
}

PolicyService.updatePolicyDetails = (policyId, premiumAmount) =>{
    return PolicyModel.updatePolicyDetails(policyId, premiumAmount)
    .then(result=>{
        if(result){
            return `Successfully Updated the details for Policy-Id ${policyId}`;
        }
        else{
            let e = new Error();
            e.status = 400;
            e.message = `Policy Id ${policyId} details coudn't be updated due to internal error`;
            throw e;
        }
    })
}

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