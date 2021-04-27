const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const employeeSchema=new Schema({
empId:{
    type:'string',
},
empName:{
    type:'string',
},
email:{
    type:'string',
},
parentId:{
    type:'string',
},
parentName:{
    type:'string',
},
},{collection:'employee'});
mongoose.model('employee',employeeSchema);