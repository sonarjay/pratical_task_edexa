var Sys=require('../../Boot/Sys');
module.exports={
    home:async function(req,res) {
        try {
            console.log("I'm calling dashboard");
            var data={
                Agent:req.session.details,
                error:req.flash("error"),
                success:req.flash("success")
            }
            return res.render('Dashboard/dashboard',data);
        } catch (error) {
            console.log("error",error);
        }
    }
}