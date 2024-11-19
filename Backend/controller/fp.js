// controllers/fp.js
const db = require('../config');  // Import the DB connection

class FpController {  // Change class name to FpController (uppercase 'F')
    async insertinput(req, res) {
        const inputs = req.body; // Expecting the payload as the object structure you've shared
        const projectId = req.params.project_id; // Get project_id from URL parameter
    
        try {
            // Validate that inputs is an object
            if (typeof inputs !== 'object' || inputs === null) {
                return res.status(400).json({ message: 'Invalid input format. Expected an object with categories as keys.' });
            }
    
            const transformedInputs = []; // Array to hold transformed inputs
    
            // Transform the inputs object into a flat array
            for (const category in inputs) {
                if (Array.isArray(inputs[category])) {
                    inputs[category].forEach((value) => {
                        transformedInputs.push({
                            category,
                            value,
                            projectId,
                        });
                    });
                }
            }
    
            // Verify the transformed inputs
            console.log('Transformed Inputs:', transformedInputs);
    
            // Prepare the database query
            const query = 'INSERT INTO fp_inputs (input_category, input_name, project_id) VALUES (?, ?, ?)';
    
            // Insert transformed inputs into the database
            for (const input of transformedInputs) {
                const [result] = await db.execute(query, [input.category, input.value, input.projectId]);
                console.log('Database Insert Result:', result); // Optionally log result
            }
    
            res.status(200).json({ message: 'All inputs saved successfully' });
        } catch (err) {
            console.error('Database Error:', err);
            res.status(500).json({ message: 'Error saving inputs', error: err.message });
        }
    }
    
    async getinputs(req, res) {
       
        const projectId = req.params.project_id;  // Get project_id from URL parameter
        
        console.log('Project ID:', projectId);  // Log project_id to verify

        const query = 'select * from fp_inputs where project_id = ?';

        try {
            // Loop over each input and insert it into the database
            const [result] = await db.execute(query, [projectId]);

            res.status(200).json({ message: 'All inputs are shown' ,data:result});
        } catch (err) {
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

    const query = `UPDATE fp_inputs SET ${field} = ? WHERE id = ?`;

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

module.exports = new FpController();  // Export the class as an instance
