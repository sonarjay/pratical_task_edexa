var express=require('express'),
router=express.Router();
var Sys=require('../../Boot/Sys');

/**
 * [ Authentication Routes]
 */

 // [ Admin Side Routes ]
 router.get('/admin',Sys.App.Middlewares.Backend.loginCheck,Sys.App.Controllers.Auth.login);
 router.post('/admin',Sys.App.Middlewares.Backend.loginCheck,Sys.App.Controllers.Auth.postLogin);
 router.get('/logout',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Controllers.Auth.logout);

// [ Dashboard Routes ]
router.get('/dashboard',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin','manager','teamlead'),Sys.App.Controllers.Dashboard.home);


// [ Manager Routes ]
router.get('/manager',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.ManagerController.manager);
router.get('/getManagerList',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.ManagerController.getManagerList);
router.get('/addManager',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.ManagerController.managerAdd);
router.post('/managerAdd',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.ManagerController.managerAddPostData);
router.get('/managerEdit/:id/',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.ManagerController.managerEdit);
router.post('/managerEdit/:id',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.ManagerController.managerAddEditData);
router.post('/getDeleteManager',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.ManagerController.getDeleteManager);
router.get('/viewManager/:id/',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.ManagerController.viewManager);

// [ TeamLead Routes ]
router.get('/teamlead',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.TeamleadController.teamlead);
router.get('/getTeamleadList',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.TeamleadController.getTeamleadList);
router.get('/addTeamlead',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.TeamleadController.addTeamlead);
router.post('/teamleadAdd',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.TeamleadController.teamleadAdd);
router.get('/teamleadEdit/:id/',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.TeamleadController.teamleadEdit);
router.post('/teamleadEdit/:id',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.TeamleadController.teamleadEditData);
router.post('/getDeleteTeamlead',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.TeamleadController.getDeleteTeamlead);
router.get('/viewTeamlead/:id/',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin'),Sys.App.Controllers.TeamleadController.viewTeamlead);

// [ Employee Routes ]
router.get('/employee',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin','manager','teamlead'),Sys.App.Controllers.EmployeeController.employee);
router.get('/getEmployeeList',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin','manager','teamlead'),Sys.App.Controllers.EmployeeController.getEmployeeList);
router.get('/addEmployee',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin','manager','teamlead'),Sys.App.Controllers.EmployeeController.addEmployee);
router.post('/employeeAdd',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin','manager','teamlead'),Sys.App.Controllers.EmployeeController.employeeAdd);
router.get('/employeeEdit/:id/',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin','manager','teamlead'),Sys.App.Controllers.EmployeeController.employeeEdit);
router.post('/employeeEdit/:id',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin','manager','teamlead'),Sys.App.Controllers.EmployeeController.employeeEditData);
router.post('/getDeleteEmployee',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin','manager','teamlead'),Sys.App.Controllers.EmployeeController.getDeleteEmployee);
router.get('/viewEmployee/:id/',Sys.App.Middlewares.Backend.Authenticate,Sys.App.Middlewares.Backend.hasRoleCheck('admin','manager','teamlead'),Sys.App.Controllers.EmployeeController.viewEmployee);

 module.exports=router