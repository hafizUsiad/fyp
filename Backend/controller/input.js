// controllers/fp.js
const db = require('../config');  // Import the DB connection

class inputController {  // Change class name to FpController (uppercase 'F')
    async insertinput(req, res) {
        const inputs = req.body; // Expecting the payload as the object structure you've shared
        const projectId = req.params.project_id; // Get project_id from URL parameter
        
        try {
            // Validate that inputs is an object and has categories as keys
            if (typeof inputs !== 'object' || inputs === null) {
                return res.status(400).json({ message: 'Invalid input format. Expected an object with categories as keys.' });
            }
            
            // Fetch all developers associated with the project
            const [teamResult] = await db.execute('SELECT developer_id FROM team WHERE project_id = ?', [projectId]);
            
            if (!teamResult || teamResult.length === 0) {
                return res.status(404).json({ message: 'No developers found for this project.' });
            }
            
            // Transform the inputs object into a flat array
            const transformedInputs = [];
            for (const category in inputs) {
                if (Array.isArray(inputs[category])) {
                    inputs[category].forEach((value) => {
                        transformedInputs.push({
                            category,
                            value,
                            projectId
                        });
                    });
                }
            }
            
            // Verify the transformed inputs
            console.log('Transformed Inputs:', transformedInputs);
            
            // Prepare the queries for both tables
            const fpQuery = 'INSERT INTO inputs (input_category, input_name, project_id) VALUES (?, ?, ?)';
            const nfpQuery = 'INSERT INTO fp_inputss (input_id, developer_id) VALUES (?, ?)';
            
            // Insert the inputs into the fp_inputs table
            for (const input of transformedInputs) {
                // Insert into fp_inputs table (for the project)
                const [fpResult] = await db.execute(fpQuery, [input.category, input.value, input.projectId]);
                
                console.log('Inserted into fp_inputs:', fpResult);
                
                // Insert into nfp_inputss table for each developer in the project
                for (const developer of teamResult) {
                    // Insert into nfp_inputss table (developer association with input)
                    const [nfpResult] = await db.execute(nfpQuery, [fpResult.insertId, developer.developer_id]);
                    console.log('Inserted into nfp_inputss for developer:', nfpResult);
                }
            }
    
            // Send success response
            res.status(200).json({ message: 'All inputs saved successfully in both tables' });
        } catch (err) {
            console.error('Database Error:', err);
            res.status(500).json({ message: 'Error saving inputs', error: err.message });
        }
    }
    
    
    
    async getinputs(req, res) {
        // Access developer_id from query parameters (for GET requests)
        const { developer_id } = req.query; // Should be passed in the query string
        const projectId = req.params.project_id;  // Get project_id from URL parameter
    
        console.log('Project ID:', projectId, 'Developer ID:', developer_id);  // Log project_id and developer_id to verify
    
        // SQL query to get the inputs based on project_id and developer_id
        const query = `
        SELECT fi.*, f.input_name ,f.input_category
        FROM fp_inputss fi
        JOIN inputs f ON fi.input_id = f.input_id
        WHERE f.project_id = ? 
        AND fi.developer_id = ?;
        `;
    
        try {
            // Execute the query to fetch inputs based on projectId and developerId
            const [result] = await db.execute(query, [projectId, developer_id]);
    
            // Return the result in the response
            res.status(200).json({ message: 'All inputs are shown', data: result });
        } catch (err) {
            // Handle any errors and return an appropriate error message
            console.error('Database Error:', err);
            res.status(500).json({ message: 'Error showing inputs', error: err.message });
        }
    }
    
  // Update a specific field (e.g., priority) of an input by its ID
  async updatecomplexity(req, res) {
    const { id, field, value } = req.body;  // Get the fields from the request body

    // Ensure that the field is a valid column name (for security)
    // const validFields = ['priority', 'status', 'type']; // Add more fields as necessary
    // if (!validFields.includes(field)) {
    //     return res.status(400).json({ message: 'Invalid field name' });
    // }

    const query = `UPDATE fp_inputs SET ${field} = ? WHERE input_id = ?`;
    console.log(query,value,id);

    try {
        const [result] = await db.execute(query, [value, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: `${field} updated successfully` });
        } else {
            res.status(404).json({ message: 'Input not found or no changes made' });
        }
    } catch (err) {
        console.error('Error updating field:', err);
        res.status(500).json({ message: 'Error updating field', error: err.message });
    }
}
}

module.exports = new inputController();  // Export the class as an instance
