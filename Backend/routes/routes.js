// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const user = require('../controller/user');
const project = require('../controller/project');
const fp = require('../controller/fp');
const msg = require('../controller/message');

// Route to register a new user
router.post('/register', user.registerUser);

// Route to get all users
router.get('/users', user.getAllUsers);

router.post('/login', user.loginuser);
router.get('/login', user.loginuser);
router.post('/project/createproject', project.createproject);
router.get('/getowner', user.getowners);
router.get('/project/allprojects', project.allproject );
router.get('/project/devprojects', project.allproject );

router.post('/project/team', project.team);
router.get('/developers', user.getdeveloper);
router.post('/project/assignteam', project.team);
router.get('/getdeveloper', user.getdeveloper);
router.post('/project/:project_id/insertinput', fp.insertinput);
router.get('/project/:project_id/getinputs', fp.getinputs);
router.post('/project/:project_id/updateinput', fp.updatecomplexity);
// Add a message
router.post("/project/:project_id/addmessages", msg.messagesend);
router.get("/project/:project_id/getmessages", msg.getmessage);
module.exports = router;
