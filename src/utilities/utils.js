const ob = {};

ob.getRightDate = ( dateSt ) =>{
    return new Date(dateSt);
}

ob.getRightMonth = ( dateSt ) =>{
    const dt = ob.getRightDate(dateSt);
    return dt.getMonth();
}

module.exports = ob;