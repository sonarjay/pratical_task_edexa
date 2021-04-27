var Sys=require('../../Boot/Sys');
var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');

var jwtConfig={
    'secret':'Auth'
};

module.exports={
    login:async function(req,res){
        try {
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success")
            };

            let isDefaultCreate=await Sys.App.Services.UserServices.getByData({});

            if(isDefaultCreate==null||isDefaultCreate.length==0){
                let insertUser=await Sys.App.Services.UserServices.insertUserData({
                    name: Sys.Config.App.defaultUserLogin.name,
                    username:  Sys.Config.App.defaultUserLogin.username,
                    email:  Sys.Config.App.defaultUserLogin.email,
                    password: bcrypt.hashSync(Sys.Config.App.defaultUserLogin.password,bcrypt.genSaltSync(8),null),
                    role:  Sys.Config.App.defaultUserLogin.role,
                    status: Sys.Config.App.defaultUserLogin.status,
                });
            }
            console.log(" data",data);
            return res.render('login',data);
        } catch (error) {
            console.log("Check in Login Error :-,",error);
        }
    },

    logout:async function(req,res){
        try {
            req.session.login=false;
           // delete session object
           await req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                 req.logout();
                console.log("logout successful");
                return res.redirect('/admin');
            }
        });
        
        } catch (error) {
            console.log("Check in Logout Error :-,",error);     
        }
    },

    postLogin:async function(req,res){
        try {
            let user= null;
             user= await Sys.App.Services.UserServices.getByData({email:req.body.email});

            let isAdminManager=false;
            let isAdminTeamLead=false;
            if(user.length==0){
                console.log("Check in Manager Table isLogin");
                //Check in Manager Table isLogin
                user= await Sys.App.Services.ManagerServices.getByData({email:req.body.email});

                if(user.length==0){
                    //Check in TeamLead Table isLogin
                    user= await Sys.App.Services.TeamLeadServices.getByData({email:req.body.email});
                    
                    if(user.length==0){
                        req.flash('error','Email Address Not Found..!!')
                        return res.redirect('/admin');
                    }else{
                        isAdminTeamLead=true;
                    }
                }else{
                    isAdminManager=true;
                }
            }   
            let passwordCheck=false;

                // Comapre Password with req.body.password and user password
                if(bcrypt.compareSync(req.body.pwd,user[0].password)){
                    passwordCheck=true;
                }else{
                    passwordCheck=false;
                }
                if(passwordCheck==true){
                    
                    //set jwt token
                    var token=jwt.sign({id:user[0].id},jwtConfig.secret,{
                        expiresIn:60*60*24 //expires in 24 hours
                    });

                    //User Authenticate Success
                    req.session.login=true;
                    req.session.details={
                        id:user[0].id,
                        name:(isAdminManager==true)?user[0].managerName:(isAdminTeamLead==true)?user[0].teamleadName:user[0].name,
                        jwt_token:token,
                        role:(isAdminManager==true)?'manager':(isAdminTeamLead==true)?'teamlead':'admin',
                        isPermission:(isAdminManager==true)?user[0].isPermission:(isAdminTeamLead==true)?user[0].isPermission:true,
                        isView:(isAdminManager==true)?user[0].isView:(isAdminTeamLead==true)?user[0].isView:true,
                        isAdd:(isAdminManager==true)?user[0].isAdd:(isAdminTeamLead==true)?user[0].isAdd:true,
                        isUpdate:(isAdminManager==true)?user[0].isUpdate:(isAdminTeamLead==true)?user[0].isUpdate:true,
                        isDelete:(isAdminManager==true)?user[0].isDelete:(isAdminTeamLead==true)?user[0].isDelete:true
                    };

                    ///console.log("req.session",req.session);

                    if(isAdminManager==true){
            
                        req.session.save(function(err) {
                            // session saved
                            if(!err) {
                                req.flash('error','Having trouble with Credential')
                                res.redirect('/admin');
                            }else{
                                req.flash('success','Welcome to Admin Panel')
                                res.redirect('/dashboard');
                            }
                        });
                    }else if(isAdminTeamLead==true){
            
                        req.session.save(function(err) {
                            // session saved
                            if(!err) {
                                req.flash('error','Having trouble with Credential')
                                res.redirect('/admin');
                            }else{
                                req.flash('success','Welcome to Admin Panel')
                                res.redirect('/dashboard');
                            }
                        });
                    }else{
            
                        req.session.save(function(err) {
                            // session saved
                            if(!err) {
                                req.flash('error','Having trouble with Credential')
                                res.redirect('/admin');
                            }else{
                                req.flash('success','Welcome to Admin Panel')
                                res.redirect('/dashboard');
                            }
                        });
                    }

                }else {
                    req.flash('error','Invalid Credential')
                   console.log("Invalid Credential",passwordCheck); 
                   return res.redirect('/admin');
                }
        } catch (error) {
            console.log("Check in postLogin Error :-,",error);    
        }
    },

}