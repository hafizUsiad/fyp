// const { response } = require('express');
// const db = require('../config'); // Import the DB connection

// class ppController {
//     async checkAllStatus(req, res) {
//         const projectId = req.params.project_id;
//         const id = req.query;

//         console.log('Checking status for Project ID:', projectId);

//         try {
//             const [teamResult] = await db.execute('SELECT developer_id FROM team WHERE project_id = ?', [projectId]);
//             if (!teamResult.length) return res.status(404).json({ message: 'No developers found for this project.' });

//             const [inputsResult] = await db.execute('SELECT input_id FROM inputs WHERE project_id = ?', [projectId]);
//             if (!inputsResult.length) return res.status(404).json({ message: 'No inputs found for this project.' });

//             const developerIds = teamResult.map(d => d.developer_id);
//             const totalInputs = developerIds.length;

//             const [statusResult] = await db.execute(`
//                 SELECT COUNT(status) AS cs
//                 FROM fp_inputss
//                 LEFT JOIN inputs ON inputs.input_id = fp_inputss.input_id
//                 WHERE inputs.project_id = ? AND status = 'done' AND fp_inputss.input_id = ?;
//             `, [projectId, id.id]);

//             const allInputsDone = totalInputs.toString() === statusResult[0].cs.toString();

//             if (allInputsDone) {
//                 try {
//                     const [responsesave] = await db.execute(`
//                         SELECT fp_inputss.developer_id, fp_inputss.complexity, users.name AS developer_name
//                         FROM fp_inputss
//                         LEFT JOIN inputs ON inputs.input_id = fp_inputss.input_id
//                         LEFT JOIN users ON users.userid = fp_inputss.developer_id
//                         WHERE inputs.project_id = ? AND status = 'done' AND fp_inputss.input_id = ?;
//                     `, [projectId, id.id]);
                    
//                     // Build the formatted message
//                     let message = `This is System generated Message\nTeam Responses For Input No:${id.id}:\n`;
                    
//                     responsesave.forEach(record => {
//                         message += `Developer ${record.developer_name}: ${record.complexity} Complexity\n`;
//                     });
//                      await db.execute(`
//                         INSERT INTO messages 
//                         (sender_id, project_id, message_text, message_type, timestamp) 
//                         VALUES (?, ?, ?, ?, NOW())
//                     `, [12, projectId, message, 'text']);                  
//                     const response = await this.finalvalue(id,projectId);
//                     console.log('Response from finalvalue:', response);
//                     console.log(`All inputs for Project ID ${projectId} have been marked as 'Done' by all developers!`);
//                 } catch (err) {
//                     console.error('Error in finalvalue:', err.message);
//                 }
//             } else {
//                 console.log(`Not all developers have marked their inputs as 'Done' for Project ID ${projectId}.`);
//             }

//             res.status(200).json({ message: 'Status check completed successfully.', allInputsDone,success: true,result:response});
//         } catch (err) {
//             console.error('Database Error:', err);
//             res.status(500).json({ message: 'Error checking status', error: err.message });
//         }
//     }

//     async finalvalue(id,projectId) {
//         try {
//             const [result] = await db.execute(`
//                 UPDATE inputs SET complexity = (
//                     SELECT complexity FROM fp_inputss
//                     WHERE input_id = ? AND status = 'done' AND complexity IS NOT NULL
//                     GROUP BY complexity
//                     HAVING COUNT(complexity) * 100.0 / (
//                         SELECT COUNT(complexity) FROM fp_inputss
//                         WHERE input_id = ? AND status = 'done' AND complexity IS NOT NULL
//                     ) > 50 LIMIT 1
//                 ) WHERE input_id = ?;
//             `, [id.id, id.id, id.id]);

//             console.log('Final Value Updated:', result);
//             // Check if any rows were affected (updated)
//         if (result.changedRows === 0 ) {
//             const svc = await this.saveDeveloperComplexity(projectId,id.id);
//             await db.execute(`update fp_inputss set status = '',spell=spell+1 where input_id = ${id.id}`);
//             console.log('No updates were made. The conditions for updating were not met.');
//             return { message: 'No update performed: conditions not met.' ,result:svc};
//         }
//             return result;
//         } catch (err) {
//             console.error('Error in finalvalue:', err.message);
//             throw err;
//         }
//     }

//     async saveDeveloperComplexity(projectId, inputid) {
//         try {
//             // Step 1: Identify the developer with the most distinct complexity
//             const [result] = await db.execute(`
//                 SELECT developer_id, complexity 
//                 FROM fp_inputss 
//                 WHERE input_id = ? 
//                 AND complexity NOT IN (
//                     SELECT complexity 
//                     FROM fp_inputss 
//                     GROUP BY complexity 
//                     HAVING COUNT(*) > 1
//                 );
//             `, [inputid]);
    
//             if (result.length === 0) {
//                 // If no result, return a message indicating no data found
//                 return { message: 'No distinct complexity found', data: null };
//             }
    
//             // Step 2: Process each developer and complexity
//             const check = [];
//             for (const row of result) {
//                 const { developer_id, complexity } = row;
    
//                 // Run the insert query for each developer and complexity
//                 const [insertResult] = await db.execute(`
//                     INSERT INTO messages 
//                     (sender_id, project_id, message_text, message_type, timestamp) 
//                     VALUES (?, ?, ?, ?, NOW());
//                 `, [developer_id, projectId, `Kindly justify your response: ${complexity}`, 'text']);
    
//                 if (insertResult.affectedRows > 0) {
//                     check.push(developer_id);
//                 }
//             }
    
//             console.log('Message table updated with developer_id and complexity:', check);
    
//             // Return success response with the inserted developers
//             return { message: 'Developer complexity saved successfully', devresponse: check };
//         } catch (err) {
//             console.error('Error saving developer complexity:', err.message);
//             // Return error response
//             return { message: 'Error saving developer complexity', error: err.message };
//         }
//     }
    
    
// }

// module.exports = new ppController();

const { response } = require('express');
const db = require('../config'); // Import the DB connection

class ppController {
    async checkAllStatus(req, res) {
        const projectId = req.params.project_id;
        const id = req.query;

        console.log('Checking status for Project ID:', projectId);

        try {
            const [teamResult] = await db.execute('SELECT developer_id FROM team WHERE project_id = ?', [projectId]);
            if (!teamResult.length) return res.status(404).json({ message: 'No developers found for this project.' });

            const [inputsResult] = await db.execute('SELECT input_id FROM inputs WHERE project_id = ?', [projectId]);
            if (!inputsResult.length) return res.status(404).json({ message: 'No inputs found for this project.' });

            const developerIds = teamResult.map(d => d.developer_id);
            const totalInputs = developerIds.length;

            const [statusResult] = await db.execute(`
                SELECT COUNT(status) AS cs
                FROM fp_inputss
                LEFT JOIN inputs ON inputs.input_id = fp_inputss.input_id
                WHERE inputs.project_id = ? AND status = 'done' AND fp_inputss.input_id = ?;
            `, [projectId, id.id]);

            const allInputsDone = totalInputs.toString() === statusResult[0].cs.toString();

            let finalResponse = { allInputsDone };

            if (allInputsDone) {
                try {
                    const [responsesave] = await db.execute(`
                        SELECT fp_inputss.developer_id, fp_inputss.complexity, users.name AS developer_name
                        FROM fp_inputss
                        LEFT JOIN inputs ON inputs.input_id = fp_inputss.input_id
                        LEFT JOIN users ON users.userid = fp_inputss.developer_id
                        WHERE inputs.project_id = ? AND status = 'done' AND fp_inputss.input_id = ?;
                    `, [projectId, id.id]);
                    
                    // Build the formatted message
                    let message = `This is System generated Message\nTeam Responses For Input No:${id.id}:\n`;
                    
                    responsesave.forEach(record => {
                        message += `Developer ${record.developer_name}: ${record.complexity} Complexity\n`;
                    });

                    await db.execute(`
                        INSERT INTO messages 
                        (sender_id, project_id, message_text, message_type, timestamp) 
                        VALUES (?, ?, ?, ?, NOW())
                    `, [12, projectId, message, 'text']);                  

                    const finalValueResponse = await this.finalvalue(id, projectId);
                    finalResponse.finalValue = finalValueResponse;
                    console.log('All inputs for Project ID', projectId, 'have been marked as "Done" by all developers!');
                } catch (err) {
                    console.error('Error in finalvalue:', err.message);
                    finalResponse.finalValue = { message: 'Error in finalvalue', error: err.message };
                }
            } else {
                console.log('Not all developers have marked their inputs as "Done" for Project ID', projectId);
                finalResponse.finalValue = { message: 'Not all inputs are marked as "Done"' };
            }

            const developerComplexityResponse = await this.saveDeveloperComplexity(projectId, id.id);
            finalResponse.developerComplexity = developerComplexityResponse;

            res.status(200).json({ 
                message: 'Status check completed successfully.', 
                success: true,
                result: finalResponse
            });
        } catch (err) {
            console.error('Database Error:', err);
            res.status(500).json({ message: 'Error checking status', error: err.message });
        }
    }

    async finalvalue(id, projectId) {
        try {
            const [result] = await db.execute(`
                UPDATE inputs SET complexity = (
                    SELECT complexity FROM fp_inputss
                    WHERE input_id = ? AND status = 'done' AND complexity IS NOT NULL
                    GROUP BY complexity
                    HAVING COUNT(complexity) * 100.0 / (
                        SELECT COUNT(complexity) FROM fp_inputss
                        WHERE input_id = ? AND status = 'done' AND complexity IS NOT NULL
                    ) > 50 LIMIT 1
                ) WHERE input_id = ?;
            `, [id.id, id.id, id.id]);

            console.log('Final Value Updated:', result);
            
            if (result.affectedRows === 0) {
                const svc = await this.saveDeveloperComplexity(projectId, id.id);
                await db.execute(`UPDATE fp_inputss SET status = '', spell = spell + 1 WHERE input_id = ?`, [id.id]);
                console.log('No updates were made. The conditions for updating were not met.');
                return { message: 'No update performed: conditions not met.', result: svc };
            }

            return result;
        } catch (err) {
            console.error('Error in finalvalue:', err.message);
            throw err;
        }
    }

    async saveDeveloperComplexity(projectId, inputid) {
        try {
// SELECT developer_id, complexity 
// FROM fp_inputss 
// WHERE input_id = ? 
// AND complexity NOT IN (
//     SELECT complexity 
//     FROM fp_inputss 
//     GROUP BY complexity 
//     HAVING COUNT(*) > 1
// );

            const [result] = await db.execute(`
            SELECT DISTINCT developer_id, complexity
                FROM fp_inputss
                WHERE input_id = ? 
                AND complexity NOT IN (
                    SELECT complexity 
                    FROM fp_inputss
                    WHERE input_id = ?
                    GROUP BY complexity
                    HAVING COUNT(*) > 1
            );
            `, [inputid,inputid]);

            if (result.length === 0) {
                return { message: 'No distinct complexity found', data: null };
            }

            const check = [];
            for (const row of result) {
                const { developer_id, complexity } = row;

                const [insertResult] = await db.execute(`
                    INSERT INTO messages 
                    (sender_id, project_id, message_text, message_type, timestamp) 
                    VALUES (?, ?, ?, ?, NOW());
                `, [developer_id, projectId, `Kindly justify your response: ${complexity}`, 'text']);

                if (insertResult.affectedRows > 0) {
                    check.push(developer_id);
                }
            }

            console.log('Message table updated with developer_id and complexity:', check);

            return { message: 'Developer complexity saved successfully', devresponse: check };
        } catch (err) {
            console.error('Error saving developer complexity:', err.message);
            return { message: 'Error saving developer complexity', error: err.message };
        }
    }
}

module.exports = new ppController();
