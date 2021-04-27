var Sys=require('../../Boot/Sys');
var dateFormat=require('dateformat');
module.exports={
    employee:async function(req,res) {
        try {

            let isView=true;
            let isAdd=true;
            let isUpdate=true;
            let isDelete=true;

            if(req.session.details.role=='manager'){
                 isView=req.session.details.isView;
                 isAdd=req.session.details.isAdd;
                 isUpdate=req.session.details.isUpdate;
                 isDelete=req.session.details.isDelete;
            }else if(req.session.details.role=='teamlead'){
                 isView=req.session.details.isView;
                 isAdd=req.session.details.isAdd;
                 isUpdate=req.session.details.isUpdate;
                 isDelete=req.session.details.isDelete;
            }

            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success"),
                isView:isView,
                isAdd:isAdd,
                isUpdate:isUpdate,
                isDelete:isDelete,
            }
            return res.render('Employess/employess',data);
        } catch (error) {
            console.log("error",error);
        }
    },


    getEmployeeList:async function(req,res) {
        try {
            
            let start=parseInt(req.query.start);
            let length=parseInt(req.query.length);

            let reqCount=await Sys.App.Services.EmployeeServices.getByDataCount({});

            let data =await Sys.App.Services.EmployeeServices.getDataTable({},length,start);

            var obj={
                'draw':req.query.draw,
                'recordsTotal':reqCount,
                'recordsFiltered':reqCount,
                'data':data
            }

            res.send(obj);

        } catch (error) {
            console.log("error",error);
        }
    },

    addEmployee:async function(req,res) {
        try {
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success")
            }
            return res.render('Employess/addEmployess',data);
        } catch (error) {
            console.log("error",error);
        }
    },

    employeeAdd:async function(req,res) {
        try {

            console.log("req.body",req.body);
            
            let ID=Date.now();
            let createdID=dateTimeFunction(ID);

            function dateTimeFunction(data) {
                let dt=new Date(data);
                let dateTime=dateFormat(dt,"yyyymmddhhMMss");
                return dateTime;
            }

            let employee=await Sys.App.Services.EmployeeServices.insertData({
                empId:createdID+"_EmpId",
                empName:req.body.name,
                email:req.body.email,
                parentId:req.session.details.id,
                parentName:req.session.details.name,

            });

            if(employee){
                req.flash('success','Entered Data Successfully.!')
                return res.redirect("/employee")
            }else{
                req.flash('error','Issue with data so please enter proper data..!!')
                return res.redirect("/employee")
            }
        } catch (error) {
            console.log("employeeAdd error",error);
        }
    },

    employeeEdit:async function(req,res) {
        try {

            let employee=await Sys.App.Services.EmployeeServices.getBySingleData({_id:req.params.id})
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success"),
                employee:employee
            }
            return res.render('Employess/addEmployess',data);
        } catch (error) {
            console.log("error",error);
        }
    },

    employeeEditData:async function(req,res) {
        try {           
            let employee=await Sys.App.Services.EmployeeServices.getBySingleData({_id:req.params.id})

            if(employee){
                let data={
                    empName:req.body.name,
                    email:req.body.email,
                }

                let update=await Sys.App.Services.EmployeeServices.findOneAndUpdate({_id:employee._id},data);
                console.log("update",update);
                req.flash('success','Update Data Successfully.!')
               return res.redirect('/employee')
            }
            req.flash('error','Issue with data so please enter proper data..!!')
            return res.redirect('/employee')
            
        } catch (error) {
            console.log("error",error);
        }
    },

    getDeleteEmployee:async function(req,res) {
        try {
            console.log("req.body.id",req.body.id);
            let employee=await Sys.App.Services.EmployeeServices.getBySingleData({_id:req.body.id});
            if(employee){
                await Sys.App.Services.EmployeeServices.delete({_id:employee._id})
                console.log("success");
                return res.send("success");
            }else{
                return res.send("error");
            }
         
        } catch (error) {
            console.log("error",error);
        }
    },

    viewEmployee:async function(req,res) {
        try {
            let employee=await Sys.App.Services.EmployeeServices.getBySingleData({_id:req.params.id})
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success"),
                employee:employee
            }
            return res.render('Employess/viewEmployee',data);
        } catch (error) {
            console.log("error",error);
        }
    },

}