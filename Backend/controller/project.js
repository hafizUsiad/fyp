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
    const { developerIds } = req.body;
  
    if (!developerIds || developerIds.length === 0) {
      return res.status(400).json({ msg: 'Please provide project ID and selected developers' });
    }
  
    try {
      // Loop through the developerIds array and insert each developer only if not already assigned
      for (const developerId of developerIds) {
        // Check if the developer is already assigned to the project
        const [existingAssignment] = await db.execute(
          'SELECT * FROM team WHERE project_id = ? AND developer_id = ?',
          [1, developerId]  // 1 is the static project ID
        );
  
        // If the developer is already assigned, skip the insertion
        if (existingAssignment.length > 0) {
          console.log(`Developer ID ${developerId} is already assigned to this project.`);
          continue; // Skip to the next developer
        }
  
        // Insert the developer if not already assigned
        await db.execute(
          'INSERT INTO team (project_id, developer_id) VALUES (?, ?)',
          [1, developerId]  // 1 is the static project ID
        );
      }
  
      res.json({ msg: 'Team assigned successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error assigning team to project' });
    }
  }
  
  async allproject(req, res) {
    try {
      const [rows] = await db.execute('SELECT * FROM project');
      res.json(rows);  // Send back an array of users
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  }
}
module.exports = new ProjectController();
