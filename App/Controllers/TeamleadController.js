var Sys=require('../../Boot/Sys');
var dateFormat=require('dateformat');
var bcrypt=require('bcryptjs');
module.exports={
    teamlead:async function(req,res) {
        try {
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success")
            }
            return res.render('TeamLead/teamlead',data);
        } catch (error) {
            console.log("error",error);
        }
    },

    getTeamleadList:async function(req,res) {
        try {
            
            let start=parseInt(req.query.start);
            let length=parseInt(req.query.length);

            let reqCount=await Sys.App.Services.TeamLeadServices.getByDataCount({});

            let data =await Sys.App.Services.TeamLeadServices.getDataTable({},length,start);

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

    addTeamlead:async function(req,res) {
        try {
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success")
            }
            return res.render('TeamLead/addTeamlead',data);
        } catch (error) {
            console.log("error",error);
        }
    },

    teamleadAdd:async function(req,res) {
        try {

            console.log("req.body",req.body);
            
            let ID=Date.now();
            let createdID=dateTimeFunction(ID);

            function dateTimeFunction(data) {
                let dt=new Date(data);
                let dateTime=dateFormat(dt,"yyyymmddhhMMss");
                return dateTime;
            }

            let Teamlead=await Sys.App.Services.TeamLeadServices.insertData({
                teamleadId:createdID+"_TeamleadId",
                teamleadName:req.body.name,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.confirmpwd,bcrypt.genSaltSync(8),null),
                parentId:req.session.details.id,
                isPermission:(req.body.isPermissionYes=='yes')?true:false,
                isView:(req.body.isPermissionYes=='yes')?(req.body.isViewYes=='yes')?true:false:false,
                isUpdate:(req.body.isPermissionYes=='yes')?(req.body.isUpdateYes=='yes')?true:false:false,
                isDelete:(req.body.isPermissionYes=='yes')?(req.body.isDeleteYes=='yes')?true:false:false,
                isAdd:(req.body.isPermissionYes=='yes')?(req.body.isAddYes=='yes')?true:false:false,
            });

            if(Teamlead){
                req.flash('success','Entered Data Successfully.!')
                return res.redirect("/teamlead")
            }else{
                req.flash('error','Issue with data so please enter proper data..!!')
                return res.redirect("/teamlead")
            }
        } catch (error) {
            console.log("teamleadAdd error",error);
        }
    },

    teamleadEdit:async function(req,res) {
        try {

            let teamlead=await Sys.App.Services.TeamLeadServices.getBySingleData({_id:req.params.id})
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success"),
                teamlead:teamlead
            }
            return res.render('TeamLead/addTeamlead',data);
        } catch (error) {
            console.log("error",error);
        }
    },

    teamleadEditData:async function(req,res) {
        try {           
            let teamlead=await Sys.App.Services.TeamLeadServices.getBySingleData({_id:req.params.id})

            if(teamlead){
                let data={
                    teamleadName:req.body.name,
                    email:req.body.email,
                    password:bcrypt.hashSync(req.body.confirmpwd,bcrypt.genSaltSync(8),null),
                    isPermission:(req.body.isPermissionYes=='yes')?true:false,
                    isView:(req.body.isPermissionYes=='yes')?(req.body.isViewYes=='yes')?true:false:false,
                    isUpdate:(req.body.isPermissionYes=='yes')?(req.body.isUpdateYes=='yes')?true:false:false,
                    isDelete:(req.body.isPermissionYes=='yes')?(req.body.isDeleteYes=='yes')?true:false:false,
                    isAdd:(req.body.isPermissionYes=='yes')?(req.body.isAddYes=='yes')?true:false:false,
                }

                let update=await Sys.App.Services.TeamLeadServices.findOneAndUpdate({_id:teamlead._id},data);
                console.log("update",update);
                req.flash('success','Update Data Successfully.!')
               return res.redirect('/teamlead')
            }
            req.flash('error','Issue with data so please enter proper data..!!')
            return res.redirect('/teamlead')
            
        } catch (error) {
            console.log("error",error);
        }
    },

    getDeleteTeamlead:async function(req,res) {
        try {
            console.log("req.body.id",req.body.id);
            let teamlead=await Sys.App.Services.TeamLeadServices.getBySingleData({_id:req.body.id});
            if(teamlead){
                await Sys.App.Services.TeamLeadServices.delete({_id:teamlead._id})
                console.log("success");
                return res.send("success");
            }else{
                return res.send("error");
            }
         
        } catch (error) {
            console.log("error",error);
        }
    },

    viewTeamlead:async function(req,res) {
        try {
            let teamlead=await Sys.App.Services.TeamLeadServices.getBySingleData({_id:req.params.id})
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success"),
                teamlead:teamlead
            }
            return res.render('TeamLead/viewTeamlead',data);
        } catch (error) {
            console.log("error",error);
        }
    },
}