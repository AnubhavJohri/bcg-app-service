/**
 * Utils File
 * Purpose is to have common utility functions that can be 
 * utilised by any component in the entire application
 */

const ob = {};

ob.getRightDate = ( dateSt ) =>{
    return new Date(dateSt);
}

ob.getRightMonth = ( dateSt ) =>{
    const dt = ob.getRightDate(dateSt);
    return dt.getMonth();
}

module.exports = ob;