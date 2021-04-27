var Sys=require('../../Boot/Sys');
var jwt=require('jsonwebtoken');

var jwtConfig={
    'secret':'Auth'
};

module.exports={

    loginCheck:async function(req,res,next){
        try {
            if(req.session.login){
                res.redirect('/dashboard');
            }else{
                next();
            }
        } catch (error) {
            console.log("Check Error in Login Check",error);
        }
    },

    Authenticate:async function(req,res,next){
        try {
            //console.log(" [ Authenticate ]: ",req.session);
            if(req.session.login){
                jwt.verify(req.session.details.jwt_token,jwtConfig.secret,async function(err,decoded){
                    if(err){
                        console.log("Err Authenticate",err);
                        req.session.destory(function(err){
                            req.logout();
                            return res.redirect('/admin');
                        })
                    }else{
                        res.locals.session=req.session.details;
                        next();
                    }
                });
            }else{
                //console.log("fail Authenticate",req.session);
                res.redirect('/admin');
            }
        } catch (error) {
            console.log("Check Error in Authenticate",error);
        }
    },

    hasRoleCheck:function(...allowed){
        //console.log("allowed",allowed);
        const isCheckAllowed=role=>allowed.indexOf(role)>-1;
        return function(req,res,next){
            if(!isCheckAllowed(req.session.details.role)){
                if(req.session.details.role=='manager'){
                    req.flash('error','You are not allowed to access that page.')
                    return res.redirect('/dashboard');
                }else if(req.session.details.role=='teamlead'){
                    req.flash('error','You are not allowed to access that page.')
                    return res.redirect('/dashboard');
                }
            }else{
                next();
            }
        }
    }

}