// controllers/fp.js
const db = require('../config');  // Import the DB connection
const questions = [
    { category: "External Inputs", question: "How many user input screens or transactions exist?" },
    { category: "External Inputs", question: "How many unique data fields are captured through user inputs?" },
    { category: "External Outputs", question: "How many unique reports or outputs are generated?" },
    { category: "External Outputs", question: "How many calculations or processing logic steps are involved in generating outputs?" },
    { category: "External Queries", question: "How many user-initiated inquiries or search transactions are there?" },
    { category: "External Queries", question: "How many different query formats or combinations exist?" },
    { category: "Internal Logical Files", question: "How many internal data tables or files does the system use?" },
    { category: "Internal Logical Files", question: "How many unique data attributes or fields are stored internally?" },
    { category: "External Interface Files", question: "How many external data files or tables does the system interact with?" },
    { category: "External Interface Files", question: "How many distinct records or attributes are exchanged with external files?" },
    { category: "User Interfaces", question: "How many unique screens or forms are provided for user interaction?" },
    { category: "User Interfaces", question: "How many navigation or user control options (e.g., menus, buttons) are offered?" },
    { category: "Error Handling", question: "How many error messages, notifications, or prompts are displayed to the user?" },
    { category: "Data Transformation", question: "How many business rules or data transformations are applied during processing?" },
  ];
class inputController {  // Change class name to FpController (uppercase 'F')
    // async insertinput(req, res) {
    //     const inputs = req.body; // Expecting the payload as the object structure you've shared
    //     const projectId = req.params.project_id; // Get project_id from URL parameter
    //     const selectedOption2 = req.body
    //     const selectedOption = req.body
    //     const selectedweights = req.body;

    //     try {
    //         // Validate that inputs is an object and has categories as keys
    //         if (typeof inputs !== 'object' || inputs === null) {
    //             return res.status(400).json({ message: 'Invalid input format. Expected an object with categories as keys.' });
    //         }
    //         // Fetch all developers associated with the project
    //         const [teamResult] = await db.execute('SELECT developer_id FROM team WHERE project_id = ?', [projectId]);
    //        const [estimation] =  await db.execute(
    //             'UPDATE project SET estimation_technique = ?, method = ? WHERE project_id = ?',
    //             [selectedOption.selectedOption, selectedOption2.selectedOption2, projectId]
    //         );
    //         if(estimation.changedRows > 0)
    //         {
    //             if(selectedOption.selectedOption === "FP" && selectedOption2.selectedOption2 === "PP")
    //                 {
    //                     const [result] = await this.fp_questions(projectId,selectedOption2);
    //                 }
    //         }
                    
    //         if (!teamResult || teamResult.length === 0) {
    //             return res.status(404).json({ message: 'No developers found for this project.' });
    //         }
            
    //         // Transform the inputs object into a flat array
    //         const transformedInputs = [];
    //         for (const category in inputs) {
    //             if (Array.isArray(inputs[category])) {
    //                 inputs[category].forEach((value) => {
    //                     transformedInputs.push({
    //                         category,
    //                         value,
    //                         projectId
    //                     });
    //                 });
    //             }
    //         }

            
    //         // Verify the transformed inputs
    //         console.log('Transformed Inputs:', transformedInputs);
            
    //         // Prepare the queries for both tables
    //         const fpQuery = 'INSERT INTO inputs (input_category, input_name, project_id) VALUES (?, ?, ?)';
    //         const nfpQuery = 'INSERT INTO fp_inputss (input_id, developer_id,spell) VALUES (?, ?,?)';
            
    //         // Insert the inputs into the fp_inputs table
    //         for (const input of transformedInputs) {
    //             // Insert into fp_inputs table (for the project)
    //             const [fpResult] = await db.execute(fpQuery, [input.category, input.value, input.projectId]);
                
    //             console.log('Inserted into fp_inputs:', fpResult);
                
    //             // Insert into nfp_inputss table for each developer in the project
    //             for (const developer of teamResult) {
    //                 // Insert into nfp_inputss table (developer association with input)
    //                 const [nfpResult] = await db.execute(nfpQuery, [fpResult.insertId, developer.developer_id,1]);
    //                 console.log('Inserted into nfp_inputss for developer:', nfpResult);
    //             }
    //         }
    
    //         // Send success response
    //         res.status(200).json({ message: 'All inputs saved successfully in both tables' });
    //     } catch (err) {
    //         console.error('Database Error:', err);
    //         res.status(500).json({ message: 'Error saving inputs', error: err.message });
    //     }
    // }
    async insertinput(req, res) {
        const inputs = req.body.inputs; // Assuming `inputs` is sent as part of the payload
        const projectId = req.params.project_id; // Get `project_id` from URL parameter
        const selectedOption2 = req.body.selectedOption2;
        const selectedOption = req.body.selectedOption;
        const selectedweights = req.body.selectedSwitches;
    
        try {
            // Validate inputs format
            console.log(selectedweights);
            if (typeof inputs !== 'object' || inputs === null) {
                return res.status(400).json({
                    message: 'Invalid input format. Expected an object with categories as keys.'
                });
            }
            if(selectedweights.length > 0)
            {
                for(const weights in selectedweights)
                {
                    console.log(weights);
                    const [existance_check] =  await db.execute(
                        'select * from fp_weights where project_id = ? and weight = ?',
                        [projectId,selectedweights[weights]]
                    );
                    if(existance_check.length <= 0)
                    {
                    await db.execute(
                        'INSERT INTO `fp_weights`(`weight`, `project_id`) VALUES (?,?)',
                        [selectedweights[weights], projectId]
                    );
                    }
               
                }
            }
            // Update the project with selected options
            const [estimation] = await db.execute(
                'UPDATE project SET estimation_technique = ?, method = ? WHERE project_id = ?',
                [selectedOption, selectedOption2, projectId]
            );
    
            // If project update succeeds, handle FP-specific logic
            if (estimation.changedRows > 0) {
                if (selectedOption === "FP" && selectedOption2 === "PP") {
                    await this.fp_questions(projectId, selectedOption2);
                }
            }
    
            // Fetch all developers associated with the project
            const [teamResult] = await db.execute(
                'SELECT developer_id FROM team WHERE project_id = ?',
                [projectId]
            );
    
            if (!teamResult || teamResult.length === 0) {
                return res.status(404).json({
                    message: 'No developers found for this project.'
                });
            }
    
            // Transform the inputs object into a flat array
            const transformedInputs = [];
            for (const category in inputs) {
                if (Array.isArray(inputs[category])) {
                    inputs[category].forEach(value => {
                        transformedInputs.push({ category, value, projectId });
                    });
                }
            }
    
            // Verify transformed inputs
            console.log('Transformed Inputs:', transformedInputs);
    
            // Prepare the queries
            const fpQuery = 'INSERT INTO inputs (input_category, input_name, project_id) VALUES (?, ?, ?)';
            const nfpQuery = 'INSERT INTO fp_inputss (input_id, developer_id, spell) VALUES (?, ?, ?)';
    
            // Insert the inputs into the `inputs` table and associate with developers
            for (const input of transformedInputs) {
                // Insert into `inputs` table
                const [fpResult] = await db.execute(fpQuery, [
                    input.category, 
                    input.value, 
                    input.projectId
                ]);
    
                console.log('Inserted into inputs:', fpResult);
    
                // Insert into `fp_inputss` table for each developer
                for (const developer of teamResult) {
                    const [nfpResult] = await db.execute(nfpQuery, [
                        fpResult.insertId, 
                        developer.developer_id, 
                        1 // Assuming `spell` is set to `1`
                    ]);
                    console.log('Inserted into fp_inputss for developer:', nfpResult);
                }
            }
    
            // Send success response
            res.status(200).json({
                message: 'All inputs saved successfully in both tables'
            });
        } catch (err) {
            console.error('Database Error:', err);
            res.status(500).json({
                message: 'Error saving inputs',
                error: err.message
            });
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
        AND fi.developer_id = ? AND f.complexity = '' limit 1;
        `;
        try {
            // Execute the query to fetch inputs based on projectId and developerId
            const [result] = await db.execute(query, [projectId, developer_id]);
            const [project] = await db.execute('select * from project where project_id = ?', [projectId]);
            const [weights] =  await db.execute(
                'select * from fp_weights where project_id = ?',
                [projectId]
            );
            if(weights.length > 0)
            {
                res.status(200).json({ message: 'All inputs are shown', data: result ,projectdetail:project,weights:weights});

            }
            else{
                res.status(200).json({ message: 'All inputs are shown', data: result ,projectdetail:project});

            }
            // Return the result in the response
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

    async fp_questions(projectid,method)
    {
        try{
             // Fetch all developers associated with the project
             const [teamResult] = await db.execute('SELECT developer_id FROM team WHERE project_id = ?', [projectid]);
            
             if (!teamResult || teamResult.length === 0) {
                 return res.status(404).json({ message: 'No developers found for this project.' });
             }
                for(const ques of questions)
                {
                     // Prepare the queries for both tables
                    const fpQuery = 'INSERT INTO inputs (input_category, input_name, project_id) VALUES (?, ?, ?)';
                    const nfpQuery = 'INSERT INTO fp_inputss (input_id, developer_id,spell) VALUES (?, ?,?)';
                    const [fpResult] = await db.execute(fpQuery, [ques.category, ques.question, projectid]);
                    if(method.selectedOption2 === "PP")
                    {
                        for (const developer of teamResult) {
                        // Insert into nfp_inputss table (developer association with input)
                        const [nfpResult] = await db.execute(nfpQuery, [fpResult.insertId, developer.developer_id,1]);
                        console.log('Inserted into nfp_inputss for developer:', nfpResult);
                    }
                    }
                    

                }
        }catch(err)
        {
            console.error('Error updating field:', err);
            res.status(500).json({ message: 'Error Gnerating Questions', error: err.message });
    
        }

    }
}

module.exports = new inputController();  // Export the class as an instance
