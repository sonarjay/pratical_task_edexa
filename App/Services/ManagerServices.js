const mongoose =require('mongoose');
var Sys=require('../../Boot/Sys');
const managermodel=mongoose.model('manager');

module.exports={


    insertData:async function(data) {
        try {
          return await managermodel.create(data);
        } catch (error) {
          console.log("services error in insertUserData",error);
        }  
    },
  
    
getByData:async function(data) {
    try {
        return await managermodel.find(data);
    } catch (error) {
        console.log("services error in getbydata",error);
    }
},

getByDataCount:async function(data) {
    try {
        return await managermodel.countDocuments(data);
    } catch (error) {
        console.log("services error in getByDataCount",error);
    }
},

getBySingleData:async function(data) {
    try {
        return await managermodel.findOne(data);
    } catch (error) {
        console.log("services error in getBySingleData",error);
    }
},

getDataTable:async function(query,length,start) {
  try {
    return await managermodel.find(query).skip(start).limit(length);
  } catch (error) {
    console.log("services error in getDataTable",error);
  }  
},

delete:async function(data) {
    try {
        return await managermodel.deleteOne(data);
    } catch (error) {
        console.log("services error in delete",error);
    }
},


findOneAndUpdate:async function(conditions,update) {
    try {
        return await managermodel.findOneAndUpdate(conditions,update);
    } catch (error) {
        console.log("services error in findOneAndUpdate",error);
    }
},

}