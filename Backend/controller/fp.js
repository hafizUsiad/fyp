// controllers/fp.js
const db = require('../config');  // Import the DB connection
const functionPoints = {
    EI: {
      Low: 4,
      Average: 5,
      High: 7,
    },
    EO: {
      Low: 5,
      Average: 6,
      High: 7,
    },
    EQ: {
      Low: 3,
      Average: 4,
      High: 5,
    },
    ILF: {
      Low: 7,
      Average: 10,
      High: 15,
    },
    EIF: {
      Low: 5,
      Average: 7,
      High: 10,
    },
  };
  
  function calculateUFP(inputCategory, complexity) {
    // Check if the input category and complexity are valid
    if (!functionPoints[inputCategory] || !functionPoints[inputCategory][complexity]) {
      throw new Error('Invalid input category or complexity');
    }
  
    // Return the function points for the given category and complexity
    return functionPoints[inputCategory][complexity];
  }

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
        const developer_id = req.body;
        const input_id = req.body;

        const projectId = req.params.project_id;
        const query = `UPDATE fp_inputss AS f1 JOIN inputs AS f2 ON f1.input_id = f2.input_id SET f1.status = 'Done' WHERE f2.project_id = ? AND f1.developer_id = ? and f1.input_id =?`;
    
        console.log(query, projectId,developer_id.developer_id,input_id.input_id); // Log the query to check its structure
        
        try {
            // Try to update the record first
            const [result] = await db.execute(query, [projectId,developer_id.developer_id,input_id.input_id]);
            return res.status(200).json({ message: `updated successfully` });

            }
         catch (err) {
            // Catch any errors during the query execution
            console.error('Error updating field:', err);
            res.status(500).json({ message: 'Error updating field', error: err.message });
        }
    }
    async fpcalculate(req, res) {
        const { project_id } = req.body;
      
        // If project_id is missing in the request body
        // if (!project_id) {
        //   return res.status(400).json({ error: 'Project ID is required' });
        // }
      
        try {
          // Query the MySQL database to get all input categories and complexities for the project
          const [rows] = await db.execute(
            'SELECT input_category, complexity FROM fp_inputss WHERE project_id = ?',
            [1]
          );
      
          if (rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
          }
      
          // Initialize a variable to accumulate the total UFP
          let totalUFP = 0;
      
          // Loop through each row and calculate the UFP
          for (let i = 0; i < rows.length; i++) {
            var { input_category, complexity } = rows[i];
            var input_category = rows[i].input_category
            // Validate the input category and complexity
            if (!input_category || !complexity) {
              console.error(`Invalid data at index ${i}: input_category or complexity is missing.`);
              continue; // Skip invalid rows
            }
      
            // Calculate UFP for this row
            const ufp = calculateUFP(input_category, complexity);
      
            // Add the UFP for this input to the total UFP
            totalUFP += ufp;
          }
      
          // Send the total UFP in the response
          res.json({ totalUFP });
      
        } catch (error) {
          console.error('Database error:', error);
          res.status(500).json({ error: 'An error occurred while processing your request' });
        }
      }
}

module.exports = new fp();