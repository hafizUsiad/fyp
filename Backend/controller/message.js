const db = require("../config"); // Import the DB connection

class Message {
  // Method to send a message
  async messagesend(req, res) {
    const { sender_id, project_id, message_text, voice_note_url, message_type } = req.body;

    try {
      const [result] = await db.execute(
        `INSERT INTO messages 
        (sender_id, project_id, message_text, voice_note_url, message_type, timestamp) 
        VALUES (?, ?, ?, ?, ?, NOW())`,
        [
          sender_id,
          project_id || null,
          message_text || null,
          voice_note_url || null,
          message_type,
        ]
      );

      res.status(201).json({ message: "Message sent successfully", id: result.insertId });
    } catch (err) {
      console.error("Error sending message: ", err);
      res.status(500).json({ message: "Error sending message" });
    }
  }

  // Method to retrieve messages
  async getmessage(req, res) {
    try {
    const [rows] = await db.execute(`SELECT * from messages`);
     res.status(200).json(rows);  // Send back an array of users
    } catch (err) {
      console.error("Error retrieving messages: ", err);
      res.status(500).json({ message: "Error retrieving messages" });
    }
  }
}

module.exports = new Message();
