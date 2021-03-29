/**
 * USED TO CREATE A NEW DB WITH NEW COLLECTION
 * takes the csv and stores it in localhost MongoDB server
 * Once this is done, we can run our queries on the api
 */

const collection = require('../utilities/connection');
let db = {};

db.setupDb = (customerDb) =>{
    return collection.getInsuranceCustomerCollection().then((user) => {
        return user.deleteMany().then(() => {
            return user.insertMany(customerDb).then((data) => {
                if( data )
                {   return "User Data Inserted Successfully!"; }
                else{
                    let e = new Error();
                    e.message = "Insertion Failed";
                    e.status = 500;
                    throw e;
                }
            })

        })
    })
}

module.exports = db;