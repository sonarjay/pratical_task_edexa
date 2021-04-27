const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const teamLeadSchema=new Schema({
teamleadId:{
        type:'string',
},
teamleadName:{
    type:'string',
},
email:{
    type:'string',
},
password:{
    type:'string',
},
parentId:{
    type:'string',
},
isPermission:{
    type:'boolean',
    default:false
},
isView:{
    type:'boolean',
    default:false
},
isUpdate:{
    type:'boolean',
    default:false
},
isDelete:{
    type:'boolean',
    default:false
},
isAdd:{
    type:'boolean',
    default:false
},
},{collection:'teamLead'});
mongoose.model('teamLead',teamLeadSchema);