// controllers/HomeController.js
const db = require('../config');  // Import the DB connection
class ProjectController {
     // Register a new user
  async createproject(req, res) {
    const { name, desc, owner } = req.body;

    try {
      // Register the new user
      const [result] = await db.execute(
        'INSERT INTO project (`project_name`, `project_description`, `project_owner`, `project_createdat`) VALUES (?, ?, ?,NOW())',
        [name, desc, owner]
      );

      res.status(201).json({ msg: 'Project Created successfully', projectid: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
  
  async team(req, res) {
    const { id,developerIds } = req.body;

  console.log("heyyy"+developerIds);

    if (!developerIds || developerIds.length === 0) {
      return res.status(400).json({ msg: 'Please provide project ID and selected developers' });
    }
  
    try {
      // Loop through the developerIds array and insert each developer only if not already assigned
      
        // Check if the developer is already assigned to the project
        console.log(id,developerIds)
        const [existingAssignment] = await db.execute(
          'SELECT * FROM team WHERE project_id = ? AND developer_id = ?',
          [id, developerIds]  // 1 is the static project ID
        );
  
        // If the developer is already assigned, skip the insertion
        if (existingAssignment.length > 0) {
          console.log(`Developer ID ${developerIds} is already assigned to this project.`);
        }
  
        // Insert the developer if not already assigned
        await db.execute(
          'INSERT INTO team (project_id, developer_id) VALUES (?, ?)',
          [id, developerIds]  // 1 is the static project ID
        );
       
       const [assigned] = await db.execute(
        'select * from  team,users where project_id = ? and developer_id = userid',
        [id]  // 1 is the static project ID
      );

      res.json({ msg: 'Team assigned successfully!' ,assigned_developers:assigned});
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error assigning team to project' });
    }
  }
  async Assigned_Members(req, res) {
    const id = req.params.project_id;
    console.log(id);
    try{
      const [assigned] = await db.execute(
        'select * from  team,users where project_id = ? and developer_id = userid',
        [id]  // 1 is the static project ID
      );
  
      res.json({ msg: 'Team Members' ,Team:assigned});
    }catch(error)
    {
      res.status(500).json({ msg: 'Error assigning team to project' ,error});

    }
  
  }

  async UnAssigned_Team(req, res) {
    const id = req.params.project_id;
    const  developerIds  = req.body.developerIds;

    console.log(developerIds);
    try{
      const [assigned] = await db.execute(
        'Delete from team where project_id = ? and developer_id = ?',
        [id,developerIds]  // 1 is the static project ID
      );
  
      res.json({ msg: 'Team Member UnAssigned' ,Team:assigned});
    }catch(error)
    {
      res.status(500).json({ msg: 'Error assigning team to project' ,error});

    }
  
  }
  async allproject(req, res) {
    const { userrole, userid } = req.query;
    console.log(userid,userrole);
    try {
      if(userrole == 3)
        {
          const [rows] = await db.execute(`SELECT DISTINCT project.* FROM project JOIN team ON project.project_id = team.project_id WHERE team.developer_id= ${userid}`);
          res.json(rows);  // Send back an array of users
        }
        else if(userrole == 2)
        {
          const [rows] = await db.execute('SELECT * FROM project,team where project.project_id = team.project_id');
          res.json(rows);  // Send back an array of users
        }else
        {
          const [rows] = await db.execute('SELECT * FROM project');
          res.json(rows);  // Send back an array of users

        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
  async team_response(req, res) {
    const id = req.params.project_id;
    const  input_id  = req.body.input_id;

    try{
      const [assigned] = await db.execute(
       `SELECT m.* FROM messages m JOIN 
       ( SELECT sender_id, MAX(timestamp) AS latest_timestamp FROM messages WHERE sender_id IN (SELECT developer_id FROM team WHERE project_id = ?) 
        and input_id =? GROUP BY sender_id ) latest_messages ON m.sender_id = latest_messages.sender_id 
        AND m.timestamp = latest_messages.latest_timestamp ORDER BY m.timestamp DESC;`,
        [id,input_id]
      );
  
      res.json({ msg: 'Team Member UnAssigned' ,Team:assigned});
    }catch(error)
    {
      res.status(500).json({ msg: 'Error assigning team to project' ,error});

    }
  }

}
module.exports = new ProjectController();
