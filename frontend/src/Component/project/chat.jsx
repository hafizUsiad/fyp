import React, { useState, useEffect, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import server_url from "../../serverconfig";
import axios from "axios";

function ChatBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Store retrieved messages
  const [newMessage, setNewMessage] = useState(""); // Track the typed message
  const [userId] = useState(1); // Example user ID
  const [projectId] = useState(1); // Example project ID
  const [isRecording, setIsRecording] = useState(false); // Track recording state
  const [audioBlob, setAudioBlob] = useState(null); // Store the recorded audio
  const mediaRecorderRef = useRef(null); // Reference to the MediaRecorder

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

  // Send a new message (text or voice) to the server
  const sendMessage = async (messageText, messageType, audioData = null) => {
    if (!messageText.trim() && !audioData) return; // Don't send if empty
  
    try {
      let formData = new FormData();
      formData.append("sender_id", userId);
      formData.append("project_id", projectId);
      formData.append("message_text", messageText);
      formData.append("message_type", messageType);
  
      if (audioData) {
        formData.append("audio", audioData); // Append audio file to the form data
      }
  
      // Send the form data to the backend
      const response = await axios.post(`${server_url}/api/project/1/addmessages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Tell the server it's a file upload
        },
      });
  
      // Add the new message to the local state
      setMessages([
        ...messages,
        {
          id: response.data.id,
          sender_id: userId,
          project_id: projectId,
          message_text: messageText,
          message_type: messageType,
          timestamp: new Date().toISOString(),
          audio: response.data.audioPath ? `${server_url}/${response.data.audioPath}` : null, // Full path to audio file
        },
      ]);
      setNewMessage("");
      setAudioBlob(null); // Reset the audio blob after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  // Start recording the voice message
  const startRecording = () => {
    setIsRecording(true);

    // Check if the browser supports the MediaRecorder API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          const audioChunks = [];
          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            setAudioBlob(audioBlob); // Save the audio blob
            sendMessage("", "voice", audioBlob); // Send audio message when stopped
          };

          mediaRecorder.start();

          // Automatically stop recording after 5 seconds (or when user stops speaking)
          setTimeout(() => {
            if (isRecording) {
              mediaRecorder.stop();
              setIsRecording(false); // Stop recording
            }
          }, 5000); // Adjust timing as needed
        })
        .catch((error) => {
          console.error("Error accessing audio devices:", error);
          setIsRecording(false);
        });
    }
  };

  // Stop recording manually (if user presses stop)
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false); // Stop recording
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
                      className={`${message.sender_id === userId ? "user text-end" : "bot"}`}
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
                        {message.sender_id === userId ? "You" : "User"}
                      </div>

                      {/* Message Text or Audio */}
                      {message.message_type === "text" ? (
                        <p
                          className={`${
                            message.sender_id === userId
                              ? "bg-primary text-white"
                              : "bg-light-gray text-dark"
                          } p-2`}
                          style={{
                            borderRadius: "10px", // Rounded message bubble
                            wordWrap: "break-word", // Wrap text if it's too long
                            lineHeight: "1.4", // Adjust line height for better readability
                            display: "inline-block",
                          }}
                        >
                          {message.message_text}
                          <div
                            style={{
                              fontSize: "10px", // Small font size for the timestamp
                              textAlign: "left",
                              color: message.sender_id === userId ? "white" : "#6c757d", // Align username accordingly
                            }}
                          >
                            {formatTime(message.timestamp)}
                          </div>
                        </p>
                      ) :message.message_type === "voice" ? (
                        <div>
                          <audio controls>
                            <source src={`${server_url}/${message.voice_note_url}`} type="audio/mp3" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      ):null}
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No messages yet.</p>
                )}
              </div>
              <div className="modal-footer">
                {/* Send Message Input */}
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={isRecording} // Disable typing while recording
                  />
                  <button className="btn btn-outline-primary" onClick={() => sendMessage(newMessage, "text")}>
                    <i className="bi bi-send-fill"></i>
                  </button>
                </div>
                {/* Record Voice Message Button */}
                <button
                  className={`btn ${isRecording ? "btn-danger" : "btn-outline-success"}`}
                  onClick={isRecording ? stopRecording : startRecording}
                  style={{ marginLeft: "10px" }}
                >
                  {isRecording ? "Stop Recording" : "Record Voice"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
