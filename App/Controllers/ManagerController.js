var Sys=require('../../Boot/Sys');
var dateFormat=require('dateformat');
var bcrypt=require('bcryptjs');
module.exports={
    manager:async function(req,res) {
        try {
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success")
            }
            return res.render('Manager/manager',data);
        } catch (error) {
            console.log("error",error);
        }
    },

    getManagerList:async function(req,res) {
        try {
            
            let start=parseInt(req.query.start);
            let length=parseInt(req.query.length);

            let reqCount=await Sys.App.Services.ManagerServices.getByDataCount({});

            let data =await Sys.App.Services.ManagerServices.getDataTable({},length,start);

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

    managerAdd:async function(req,res) {
        try {
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success")
            }
            return res.render('Manager/addManager',data);
        } catch (error) {
            console.log("error",error);
        }
    },

    managerAddPostData:async function(req,res) {
        try {

            console.log("req.body",req.body);
            
            let ID=Date.now();
            let createdID=dateTimeFunction(ID);

            function dateTimeFunction(data) {
                let dt=new Date(data);
                let dateTime=dateFormat(dt,"yyyymmddhhMMss");
                return dateTime;
            }

            let manager=await Sys.App.Services.ManagerServices.insertData({
                managerId:createdID+"_ManagerId",
                managerName:req.body.name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.confirmpwd,bcrypt.genSaltSync(8),null),
                parentId:req.session.details.id,
                isPermission:(req.body.isPermissionYes=='yes')?true:false,
                isView:(req.body.isPermissionYes=='yes')?(req.body.isViewYes=='yes')?true:false:false,
                isUpdate:(req.body.isPermissionYes=='yes')?(req.body.isUpdateYes=='yes')?true:false:false,
                isDelete:(req.body.isPermissionYes=='yes')?(req.body.isDeleteYes=='yes')?true:false:false,
                isAdd:(req.body.isPermissionYes=='yes')?(req.body.isAddYes=='yes')?true:false:false,
            });

            if(manager){
                req.flash('success','Entered Data Successfully.!')
                return res.redirect("/manager")
            }else{
                req.flash('error','Issue with data so please enter proper data..!!')
                return res.redirect("/manager")
            }
        } catch (error) {
            console.log("managerAddPostData error",error);
        }
    },

    managerEdit:async function(req,res) {
        try {

            let manager=await Sys.App.Services.ManagerServices.getBySingleData({_id:req.params.id})
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success"),
                manager:manager
            }
            return res.render('Manager/addManager',data);
        } catch (error) {
            console.log("error",error);
        }
    },

    managerAddEditData:async function(req,res) {
        try {           
            let manager=await Sys.App.Services.ManagerServices.getBySingleData({_id:req.params.id})

            if(manager){
                let data={
                    managerName:req.body.name,
                    email:req.body.email,
                    password:bcrypt.hashSync(req.body.confirmpwd,bcrypt.genSaltSync(8),null),
                    isPermission:(req.body.isPermissionYes=='yes')?true:false,
                    isView:(req.body.isPermissionYes=='yes')?(req.body.isViewYes=='yes')?true:false:false,
                    isUpdate:(req.body.isPermissionYes=='yes')?(req.body.isUpdateYes=='yes')?true:false:false,
                    isDelete:(req.body.isPermissionYes=='yes')?(req.body.isDeleteYes=='yes')?true:false:false,
                    isAdd:(req.body.isPermissionYes=='yes')?(req.body.isAddYes=='yes')?true:false:false,
                }

                let update=await Sys.App.Services.ManagerServices.findOneAndUpdate({_id:manager._id},data);
                console.log("update",update);
                req.flash('success','Update Data Successfully.!')
               return res.redirect('/manager')
            }
            req.flash('error','Issue with data so please enter proper data..!!')
            return res.redirect('/manager')
            
        } catch (error) {
            console.log("error",error);
        }
    },

    getDeleteManager:async function(req,res) {
        try {
            console.log("req.body.id",req.body.id);
            let manager=await Sys.App.Services.ManagerServices.getBySingleData({_id:req.body.id});
            if(manager){
                await Sys.App.Services.ManagerServices.delete({_id:manager._id})
                console.log("success");
                return res.send("success");
            }else{
                return res.send("error");
            }
         
        } catch (error) {
            console.log("error",error);
        }
    },

    viewManager:async function(req,res) {
        try {
            let manager=await Sys.App.Services.ManagerServices.getBySingleData({_id:req.params.id})
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success"),
                manager:manager
            }
            return res.render('Manager/viewManager',data);
        } catch (error) {
            console.log("error",error);
        }
    },


}