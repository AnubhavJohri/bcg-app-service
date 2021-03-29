const { Schema  } = require('mongoose');
const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex' , true);
const { DB_NAME } = require('../utilities/Constants/dbconstants');


/** 
 * THESE URLS ARE WHERE DATABASE IS STORED
 * DONT TOUCH THE URLS
 * ------------------------------------------------------------------------------------------------------------------
 * 1.)COSMOS MONGODB URL
 * OFFLINE ONLY
 * FOR OFFLINE USE AND TESTING
 * */
const url = "mongodb://localhost:27017/BCG_DB";


/** USER COLLECTION SCHEMA 
 * Mongoose Schema to make sure that we adhere to a data structure
 * All the updations in database goes through the schema and it has all the validations
 * for each data.
*/
const customerSchema = Schema({
    policyId : { type:String ,required:[true,"Policy Id is required"] } ,
    customerId : { type:String, required:[true,"Customer Id is required"] } ,
    fuelType : { type:String } ,
    vehicleSegment : { type:String } ,
    premiumAmount : { type:Number } ,
    bodilyInjuryLiability : { type:Number } ,
    personalInjuryProtection : { type:Number } ,
    propertyDamageLiability : { type:Number } ,
    collision : { type:Number } ,
    comprehensive : { type:Number } ,
    customerIncomeGroup : { type:String } ,
    customerRegion : { type:String } ,
    customerMaritalStatus : { type:String },
    dateOfPurchase :  { type:Date },
    monthOfPurchase : { type:Number }
} , { collection : DB_NAME , timestamp : true}  )


//1.)Fetches the database object from the database on order to query it
let collection = {};

collection.getInsuranceCustomerCollection = () =>{
    return Mongoose.connect( url , { useNewUrlParser: true })
    .then(database =>{
        return database.model(DB_NAME , customerSchema )
    }).catch(() => {
        let e = new Error();
        e.message = "Could not connect to Database";
        e.status = 500;
        throw e;
    })
}
module.exports = collection;