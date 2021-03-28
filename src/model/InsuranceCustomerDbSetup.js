const collection = require('../utilities/connection');
let db = {};

db.setupDb = (customerDb) =>{
    // console.log('in dbsetup.js file', customerDb);
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