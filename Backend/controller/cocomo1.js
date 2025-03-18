const db = require('../config');  // Import the DB connection
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
class cocomo1
{

    async basic_calculate(estimation_id) 
    {
        const estimationid = estimation_id;
        var FP = localStorage.getItem("FP");
        let projectType;
        let a, b, c, d;
        let KLOC = FP / 60;
        if (FP < 2000) {
            projectType = "Organic";
            a = 2.4; b = 1.05; c = 2.5; d = 0.38;
        } else if (FP >= 2000 && FP <= 10000) {
            projectType = "Semi-Detached";
            a = 3.0; b = 1.12; c = 2.5; d = 0.35;
        } else {
            projectType = "Embedded";
            a = 3.6; b = 1.20; c = 2.5; d = 0.32;
        }
         // Step 5: Calculate Effort (Person-Months)
         let effort = a * Math.pow(KLOC, b);

         // Step 6: Calculate Development Time (Months)
         let time = c * Math.pow(effort, d);
 
         // Step 7: Calculate Team Size
         let teamSize = effort / time;

         if(effort)
        {
            const [save_ouput] = await db.execute('update `project_estimation` set  `effort` = ?, `time` = ?, `cost` = ? where estimation_id = ? ',
            [effort,time,teamSize,estimationid]);
        }
    }

}

module.exports = new cocomo1();