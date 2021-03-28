const collection = require('../utilities/connection');
let PostModel = {};
let PolicyModel = {};

/*
1.) Gets Policy Details :-
Takes in CustomerId/PolicyId as input and returns the details for that Id
*/
PolicyModel.getPolicyDetails = (id) =>{
    return collection.getInsuranceCustomerCollection()
    .then(insuranceCollection=>{
        return insuranceCollection.findOne({$or:[
            { policyId : id },
            { customerId : id}
        ]} , { _id : 0 } )
        .then(data=>data)
    })
}


PolicyModel.getPoliciesOfRegion = (region) =>{
    return collection.getInsuranceCustomerCollection()
    .then(insuranceCollection=>{
        return insuranceCollection.find( { customerRegion : region } , { _id : 0, monthOfPurchase : 1, dateOfPurchase : 1 } )
        .then(policies=>policies)
    })
}

PolicyModel.updatePolicyDetails = (policyId, premiumAmount) =>{
    return collection.getInsuranceCustomerCollection()
    .then(insuranceCollection=>{
        return insuranceCollection.updateOne({ "policyId" : policyId }, { $set : { "premiumAmount" : premiumAmount } })
        .then(result=>{
            if(result&&result.nModified) return 1;
            else return 0;
        })
    })
}

PolicyModel.getAllRegions = () =>{
    return collection.getInsuranceCustomerCollection()
    .then(insuranceCollection=>{
        return insuranceCollection.find()
        .then(result=>result)
    })
}



module.exports = PolicyModel;


// db.User.find().pretty()
//db.User.update( { userId : "U1001" } ,{ $pull : { userPosts : "P1001"} } )
// db.Post.find( { $and : [ {userId : "U1003" } , {postId : "P1001" } ] } , { _id:0 , postComments :1 } ).sort({"postComments.commentId":-1})
// db.Post.aggregate( [ $match : {$and:[{userId : "U1003"},{postId : "P1001"}] } ] );
//db.Post.aggregate( [ {$match : {userId : "U1005",postId : "P1004"}} ,{ $project : {_id:0 , postComments:1}},  {$unwind : "$postComments"}, {$sort : {"postComments.commentId":-1}}]).pretty()