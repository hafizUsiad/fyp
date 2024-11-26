const db = require('../config');  // Import the DB connection

class ppController { 
//     async checkAllStatus(req, res) {
//         const projectId = req.params.project_id;  // Get project_id from URL parameter
    
//         console.log('Checking status for Project ID:', projectId);  // Log project_id to verify
    
//         try {
//             // Step 1: Get the list of developers for this project
//             const [teamResult] = await db.execute('SELECT developer_id FROM team WHERE project_id = ?', [projectId]);
    
//             if (!teamResult || teamResult.length === 0) {
//                 return res.status(404).json({ message: 'No developers found for this project.' });
//             }
    
//             // Step 2: Get all inputs for the project
//             const [inputsResult] = await db.execute('SELECT input_id FROM fp_inputs WHERE project_id = ?', [projectId]);
    
//             if (!inputsResult || inputsResult.length === 0) {
//                 return res.status(404).json({ message: 'No inputs found for this project.' });
//             }
    
//             // Step 3: Get the input IDs and developer IDs
//             const inputIds = inputsResult.map(input => input.input_id);
//             const developerIds = teamResult.map(developer => developer.developer_id);
//             const inputIdsList = inputIds.join(', ');
// const developerIdsList = developerIds.join(', ');
//     console.log(inputIds,developerIdsList ,inputIdsList)
//             // Step 4: Ensure inputIds and developerIds are arrays and not empty
//             if (!Array.isArray(inputIds) || inputIds.length === 0) {
//                 return res.status(400).json({ message: 'Invalid or empty input IDs.' });
//             }
//             if (!Array.isArray(developerIds) || developerIds.length === 0) {
//                 return res.status(400).json({ message: 'Invalid or empty developer IDs.' });
//             }
    
//             // Query to check if all developers have marked their inputs as 'Done'
//             const [statusResult] = await db.execute(`
//                 SELECT fi.input_id, fi.developer_id, COUNT(*) as doneCount
//                 FROM fp_inputss fi
//                 JOIN fp_inputs f ON fi.input_id = f.input_id
//                 WHERE f.project_id = ? 
//                 AND fi.status = 'Done' 
//                 AND fi.input_id IN (?) 
//                 AND fi.developer_id IN (?)
//                 GROUP BY fi.input_id, fi.developer_id
//             `, [projectId, inputIdsList, developerIdsList]);
    
//             // Step 5: Check if all inputs are 'Done' by all developers
//             let allInputsDone = true;
    
//             // Create a map to track the 'Done' counts for each input
//             const doneCounts = {};
//             statusResult.forEach(status => {
//                 if (!doneCounts[status.input_id]) {
//                     doneCounts[status.input_id] = new Set();
//                 }
//                 doneCounts[status.input_id].add(status.developer_id);
//             });
   
//             // Check if every input has all the developers marked as 'Done'
//             for (const inputId of inputIds) {
   

//                 if (!doneCounts[inputId] || doneCounts[inputId].size !== developerIds.length) {
//                     allInputsDone = false;
//                     break;
//                 }
//             }
    
//             // Log the message based on whether all inputs are 'Done' for all developers
//             if (allInputsDone) {
//                 console.log(`All inputs for Project ID ${projectId} have been marked as 'Done' by all developers!`);
//             } else {
//                 console.log(`Not all developers have marked their inputs as 'Done' for Project ID ${projectId}.`);
//             }
    
//             // Respond back to the client
//             res.status(200).json({
//                 message: 'Status check completed successfully.',
//                 allInputsDone
//             });
    
//         } catch (err) {
//             console.error('Database Error:', err);
//             res.status(500).json({ message: 'Error checking status', error: err.message });
//         }
//     }
    
async checkAllStatus(req, res) {
    const projectId = req.params.project_id;  // Get project_id from URL parameter

    console.log('Checking status for Project ID:', projectId);  // Log project_id to verify

    try {
        // Step 1: Get the list of developers for this project
        const [teamResult] = await db.execute('SELECT developer_id FROM team WHERE project_id = ?', [projectId]);

        if (!teamResult || teamResult.length === 0) {
            return res.status(404).json({ message: 'No developers found for this project.' });
        }

        // Step 2: Get all inputs for the project
        const [inputsResult] = await db.execute('SELECT input_id FROM inputs WHERE project_id = ?', [projectId]);

        if (!inputsResult || inputsResult.length === 0) {
            return res.status(404).json({ message: 'No inputs found for this project.' });
        }

        // Step 3: Get the input IDs and developer IDs
        const inputIds = inputsResult.map(input => input.input_id);
        const developerIds = teamResult.map(developer => developer.developer_id);
        const developerIdsList = developerIds.join(', ');
        const inputIdsList = inputIds.join(', ');
        // Step 4: Ensure inputIds and developerIds are arrays and not empty
        if (!Array.isArray(inputIds) || inputIds.length === 0) {
            return res.status(400).json({ message: 'Invalid or empty input IDs.' });
        }
        if (!Array.isArray(developerIds) || developerIds.length === 0) {
            return res.status(400).json({ message: 'Invalid or empty developer IDs.' });
        }

        // Query to check if all developers have marked their inputs as 'Done'
        const [statusResult] = await db.execute(`
           SELECT count(status) as cs FROM fp_inputss LEFT join inputs on inputs.input_id = fp_inputss.input_id where inputs.project_id = ? 
           and status = 'done';

        `, [projectId]);

        // Log the status result to debug
        console.log("Status Result:", statusResult[0].cs);

        // Step 5: Check if all inputs are 'Done' by all developers
        let allInputsDone = false;

        // Create a map to track the 'Done' counts for each inpu
        console.log(inputIds.length,developerIds.length)
        const totalinputs = (inputIds.length*developerIds.length);
        // Check if every input has all the developers marked as 'Done'
        console.log(totalinputs.toString())
            if (totalinputs.toString() == statusResult[0].cs) {
                allInputsDone = true;
                // Exit the loop as soon as we find an incomplete input
            }
        

        // Log the message based on whether all inputs are 'Done' for all developers
        if (allInputsDone) {
            console.log(`All inputs for Project ID ${projectId} have been marked as 'Done' by all developers!`);
        } else {
            console.log(`Not all developers have marked their inputs as 'Done' for Project ID ${projectId}.`);
        }

        // Respond back to the client
        res.status(200).json({
            message: 'Status check completed successfully.',
            allInputsDone
        });

    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ message: 'Error checking status', error: err.message });
    }
}

    
}

module.exports = new ppController(); 
