//Deals with Post Collection in Silk RoadDB
const { getRightDate, getRightMonth } = require('../utilities/utils.js');

class CustomerData  {
    constructor(customer){
        this.policyId = customer['Policy_id'].trim() ,
        this.customerId = customer['Customer_id'].trim() ,
        this.fuelType = customer['Fuel'].toLowerCase().trim() ,
        this.vehicleSegment = customer['VEHICLE_SEGMENT'].toLowerCase().trim() ,
        this.premiumAmount = customer['Premium'].trim() ,
        this.bodilyInjuryLiability = customer['bodily injury liability'].trim() ,
        this.personalInjuryProtection = customer['personal injury protection'].trim() ,
        this.propertyDamageLiability = customer['property damage liability'].trim() ,
        this.collision = customer['collision'].trim() ,
        this.comprehensive = customer['comprehensive'].trim() ,
        this.customerIncomeGroup = customer['Customer_Income group'].trim() ,
        this.customerRegion = customer['Customer_Region'].toLowerCase().trim() ,
        this.customerMaritalStatus = customer['Customer_Marital_status'].toLowerCase().trim(),
        this.dateOfPurchase =  getRightDate(customer['Date of Purchase']),
        this.monthOfPurchase = getRightMonth(customer['Date of Purchase'])
    }
}

module.exports = CustomerData


