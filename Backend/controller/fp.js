// controllers/fp.js
const db = require('../config');  // Import the DB connection

class fp {

    async updatecomplexity(req, res) {
        const { id, field, value, developer_id } = req.body;  // Get the fields from the request body
        const query = `UPDATE fp_inputss SET ${field} = ? WHERE input_id = ? and developer_id = ?`;
    
        console.log(query, value, id,developer_id); // Log the query to check its structure
        
        try {
            // Try to update the record first
            const [result] = await db.execute(query, [value, id,developer_id]);
            return res.status(200).json({ message: `${field} updated successfully` });
        } catch (err) {
            // Catch any errors during the query execution
            console.error('Error updating field:', err);
            res.status(500).json({ message: 'Error updating field', error: err.message });
        }
    }
    async updatestatus(req, res) {
        const developer_id = req.query.developer_id;
        const projectId = req.params.project_id;
        const query = `UPDATE fp_inputss AS f1 JOIN inputs AS f2 ON f1.input_id = f2.input_id SET f1.status = 'Done' WHERE f2.project_id = ? AND f1.developer_id = ?`;
    
        console.log(query, projectId,developer_id); // Log the query to check its structure
        
        try {
            // Try to update the record first
            const [result] = await db.execute(query, [projectId,developer_id]);
    
           
                // If a row is updated, send success response
                return res.status(200).json({ message: `${field} updated successfully` });
           
            }
         catch (err) {
            // Catch any errors during the query execution
            console.error('Error updating field:', err);
            res.status(500).json({ message: 'Error updating field', error: err.message });
        }
    }
}

module.exports = new fp();