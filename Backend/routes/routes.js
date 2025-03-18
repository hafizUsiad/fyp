// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const user = require('../controller/user');
const project = require('../controller/project');
const input = require('../controller/input');
const fp = require('../controller/fp');
const msg = require('../controller/message');
const pokerplanning = require('../controller/pokerplanning');
const multer = require('multer');
const path = require('path');

// Configure multer storage and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/audio'); // Save uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name based on timestamp
  }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });
// Route to register a new user
router.post('/register',upload.single("user_profile"), user.registerUser);

// Route to get all users
router.get('/users', user.getAllUsers);

router.post('/login', user.loginuser);
router.get('/login', user.loginuser);
router.post('/project/createproject', project.createproject);
router.get('/getowner', user.getowners);
router.get('/project/allprojects', project.allproject );
router.get('/project/devprojects', project.allproject );

router.get('/project/:project_id/team', project.Assigned_Members);
router.post('/project/:project_id/unassignteam', project.UnAssigned_Team);
router.get('/project/:project_id/team_response', project.team_response);

router.get('/developers', user.getdeveloper);
router.post('/project/assignteam', project.team);
router.get('/getdeveloper', user.getdeveloper);
router.post('/project/:project_id/insertinput', input.insertinput.bind(input));
router.get('/project/:project_id/getinputs', input.getinputs.bind(input));
router.post('/project/:project_id/updateinput', fp.updatecomplexity);
router.post('/project/:project_id/updateinputstatus', fp.updatestatus);
// Add a message
router.post("/project/:project_id/addmessages", upload.single("audio"), msg.messagesend);
router.get("/project/:project_id/getmessages", msg.getmessage);
router.get("/project/:project_id/checkstatus", pokerplanning.checkAllStatus.bind(pokerplanning));
router.get("/project/:project_id/fpcalculate", fp.fpcalculate);
router.get("/project/:project_id/fpoutput", pokerplanning.outputvalues);

module.exports = router;
