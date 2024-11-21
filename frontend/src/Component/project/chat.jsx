// import React, { useState, useEffect } from "react";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import server_url from "../../serverconfig";
// import axios from "axios";

// function ChatBox() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [messages, setMessages] = useState([]); // Store retrieved messages
//   const [newMessage, setNewMessage] = useState(""); // Track the typed message
//   const [userId] = useState(1); // Example user ID
//   const [projectId] = useState(1); // Example project ID

//   // Toggle modal visibility
//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   // Fetch messages from the server when the modal is opened
//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`${server_url}/api/project/1/getmessages`);
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   // Send a new message to the server
//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const response = await axios.post(`${server_url}/api/project/1/addmessages`, {
//         sender_id: userId,
//         project_id: projectId,
//         message_text: newMessage,
//         message_type: "text",
//       });
//       // Add the new message locally
//       setMessages([
//         ...messages,
//         {
//           id: response.data.id,
//           sender_id: userId,
//           project_id: projectId,
//           message_text: newMessage,
//           message_type: "text",
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // Fetch messages only when the modal is opened
//   useEffect(() => {
//     if (isModalOpen) {
//       fetchMessages(); // Fetch messages once when modal opens
//     }
//   }, [isModalOpen]);

//   return (
//     <>
//       {/* Floating Chat Icon */}
//       <button
//         className="btn btn-primary rounded-circle"
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           width: "60px",
//           height: "60px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//         }}
//         onClick={toggleModal}
//       >
//         <i className="bi bi-chat-dots"></i>
//       </button>

//       {/* Chat Modal */}
//       {isModalOpen && (
//         <div
//           className="modal fade show d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{ background: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Chat</h5>
//                 <button type="button" className="btn-close" onClick={toggleModal}></button>
//               </div>
//               <div
//                 className="modal-body"
//                 style={{
//                   maxHeight: "400px",
//                   overflowY: "auto", // Make the message box scrollable
//                   paddingRight: "10px",
//                 }}
//               >
//                 {/* Messages List */}
//                 {messages.length > 0 ? (
//                   messages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`message ${
//                         message.sender_id === userId ? "user text-end" : "bot"
//                       } mb-3`}
//                       style={{
//                         maxWidth: "fit-content", // Make each message box fit to content
//                         textAlign: message.sender_id === userId ? "left" : "right", // Align text to left or right
//                       }}
//                     >
//                       {/* User name display */}
//                       <div
//                         style={{
//                           fontSize: "12px", // Small font size for the username
//                           color: "#6c757d", // Light gray color for the username
//                           marginBottom: "5px", // Space between username and message
//                           textAlign: message.sender_id === userId ? "left" : "right", // Align username accordingly
//                         }}
//                       >
//                         {message.sender_id === userId ? "You" : "User"} {/* Display "You" for the current user */}
//                       </div>

//                       {/* Message Text */}
//                       <p
//                         className={`${
//                           message.sender_id === userId
//                             ? "bg-primary text-white" // User's messages are primary color
//                             : "bg-light-gray text-dark" // Other user's messages are light gray
//                         } p-2 `}
//                         style={{
//                           borderRadius: "10px", // Rounded message bubble
//                           wordWrap: "break-word", // Wrap text if it's too long
//                           lineHeight: "1.4", // Adjust line height for better readability
//                           marginBottom: "5px", // Space between messages
//                           display: "inline-block",
//                         }}
//                       >
//                         {message.message_text} {message.timestamp[0]}
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-muted">No messages yet.</p>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Type your message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                   />
//                   <button className="btn btn-outline-primary" onClick={sendMessage}>
//                     <i className="bi bi-send-fill"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ChatBox;
import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import server_url from "../../serverconfig";
import axios from "axios";

function ChatBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Store retrieved messages
  const [newMessage, setNewMessage] = useState(""); // Track the typed message
  const [userId] = useState(1); // Example user ID
  const [projectId] = useState(1); // Example project ID

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Fetch messages from the server when the modal is opened
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${server_url}/api/project/1/getmessages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send a new message to the server
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(`${server_url}/api/project/1/addmessages`, {
        sender_id: userId,
        project_id: projectId,
        message_text: newMessage,
        message_type: "text",
      });
      // Add the new message locally
      setMessages([
        ...messages,
        {
          id: response.data.id,
          sender_id: userId,
          project_id: projectId,
          message_text: newMessage,
          message_type: "text",
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Fetch messages only when the modal is opened
  useEffect(() => {
    if (isModalOpen) {
      fetchMessages(); // Fetch messages once when modal opens
    }
  }, [isModalOpen]);

  // Function to format the timestamp and show only time (HH:mm format)
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // Format to display time as HH:mm
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        className="btn btn-primary rounded-circle"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        onClick={toggleModal}
      >
        <i className="bi bi-chat-dots"></i>
      </button>

      {/* Chat Modal */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chat</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div
                className="modal-body"
                style={{
                  maxHeight: "400px",
                  overflowY: "auto", // Make the message box scrollable
                  paddingRight: "10px",
                }}
              >
                {/* Messages List */}
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message ${
                        message.sender_id === userId ? "user text-end" : "bot"
                      } mb-3`}
                      style={{
                        maxWidth: "fit-content", // Make each message box fit to content
                      }}
                    >
                      {/* User name display */}
                      <div
                        style={{
                          fontSize: "12px", // Small font size for the username
                          color: "#6c757d", // Light gray color for the username
                          marginBottom: "5px", // Space between username and message
                        }}
                      >
                        {message.sender_id === userId ? "You" : "User"} {/* Display "You" for the current user */}
                      </div>

                      {/* Message Text */}
                      <p
                        className={`${
                          message.sender_id === userId
                            ? "bg-primary text-white" // User's messages are primary color
                            : "bg-light-gray text-dark" // Other user's messages are light gray
                        } p-2`}
                        style={{
                          borderRadius: "10px", // Rounded message bubble
                          wordWrap: "break-word", // Wrap text if it's too long
                          lineHeight: "1.4", // Adjust line height for better readability
                          display: "inline-block",
                        }}
                      >
                        {message.message_text} <div
                        style={{
                          fontSize: "10px", // Small font size for the timestamp
                          textAlign:"left",
                          color: message.sender_id === userId ? "white" : "#6c757d", // Align username accordingly

                        }}
                      >
                        {/* Show only the time (HH:mm format) */}
                        {formatTime(message.timestamp)}
                      </div>
                      </p>

                      {/* Timestamp Display */}
                     
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No messages yet.</p>
                )}
              </div>
              <div className="modal-footer">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button className="btn btn-outline-primary" onClick={sendMessage}>
                    <i className="bi bi-send-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
