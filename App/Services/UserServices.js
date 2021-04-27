'use strict';
const mongoose =require('mongoose');
var Sys=require('../../Boot/Sys');
const model=mongoose.model('User');

module.exports={

getByData:async function(data) {
    try {
        return await model.find(data);
    } catch (error) {
        console.log("User services error in getbydata",error);
    }
},

getByDataCount:async function(data) {
    try {
        return await model.countDocuments(data);
    } catch (error) {
        console.log("User services error in getByDataCount",error);
    }
},

getBySingleData:async function(data) {
    try {
        return await model.findOne(data);
    } catch (error) {
        console.log("User services error in getBySingleData",error);
    }
},

getUserDataTable:async function(query,length,start) {
  try {
    return await model.find(query).skip(start).limit(length);
  } catch (error) {
    console.log("User services error in getUserDataTable",error);
  }  
},

insertUserData:async function(data) {
    try {
      return await model.create(data);
    } catch (error) {
      console.log("User services error in insertUserData",error);
    }  
},
  

delete:async function(data) {
    try {
        return await model.deleteOne(data);
    } catch (error) {
        console.log("User services error in delete",error);
    }
},


findOneAndUpdate:async function(conditions,update) {
    try {
        return await model.findOneAndUpdate(conditions,update);
    } catch (error) {
        console.log("User services error in findOneAndUpdate",error);
    }
},

}