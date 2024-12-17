import React, { useState, useEffect, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import server_url from "../../serverconfig";
import axios from "axios";

function ChatBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId] = useState(1);
  const [projectId] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${server_url}/api/project/1/getmessages`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (messageText, messageType, audioData = null) => {
    if (!messageText.trim() && !audioData) return;

    try {
      let formData = new FormData();
      formData.append("sender_id", userId);
      formData.append("project_id", projectId);
      formData.append("message_text", messageText);
      formData.append("message_type", messageType);

      if (audioData) {
        formData.append("audio", audioData);
      }

      const response = await axios.post(`${server_url}/api/project/1/addmessages`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessages([
        ...messages,
        {
          id: response.data.id,
          sender_id: userId,
          project_id: projectId,
          message_text: messageText,
          message_type: messageType,
          timestamp: new Date().toISOString(),
          audio: response.data.audioPath ? `${server_url}/${response.data.audioPath}` : null,
        },
      ]);
      setNewMessage("");
      setAudioBlob(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          const audioChunks = [];
          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            setAudioBlob(audioBlob);
            sendMessage("", "voice", audioBlob);
          };

          mediaRecorder.start();

          setTimeout(() => {
            if (isRecording) {
              mediaRecorder.stop();
              setIsRecording(false);
            }
          }, 5000);
        })
        .catch((error) => {
          console.error("Error accessing audio devices:", error);
          setIsRecording(false);
        });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchMessages();
    }
  }, [isModalOpen]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  return (
    <>
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

      {isModalOpen && (
        <div
          className="modal fade show d-block"

          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-dialog-centered w-100">
            <div className="modal-content" style={{ borderRadius: "15px" }}>
              {/* Header */}
              <div className="modal-header bg-light-primary text-white">
                <h5 className="modal-title">Chat</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>

              {/* Body */}
              <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-2 d-flex ${
                        message.sender_id === userId ? "justify-content-end" : "justify-content-start"
                      }`}
                    >
                       {message.sender_id !== userId ? (
 <small
 style={{
   marginTop:"20px",
   backgroundColor:"gray",
   height:"30px",
   width:"30PX",
   borderRadius:"1000px",
   color:"white",
   textAlign:"center",
   marginRight:"5px"
 }}
 >{"  "+message.initials+"  "}  </small>


                       ):null}
                      
                      <div
                        className={`p-2 ${
                          message.sender_id === userId ? "sky-blue text-white" : "bg-light text-dark"
                        } rounded`}
                        style={{ maxWidth: "75%"

                        }}
                      >
                       
                        {message.message_type === "text" ? (
                          <p className="mb-1"
                          style = {{
                            marginBottom:"-8px !important"
                          }}
                          >{message.message_text}</p>
                        ) : (
                          <audio controls>
                            <source src={`${server_url}/${message.voice_note_url}`} type="audio/mp3" />
                            Your browser does not support the audio element.
                          </audio>
                        )}
                        <small
                         style = {{
                          marginTop:"-16px",
                          marginBottom:"-10px",
                        }}
                        className="d-block text-end text-white text-muted">{formatTime(message.timestamp)}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No messages yet.</p>
                )}
              </div>

              {/* Footer */}
              <div className="modal-footer bg-light">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={isRecording}
                  />
                  <button className="btn btn-primary" onClick={() => sendMessage(newMessage, "text")}>
                    <i className="bi bi-send-fill"></i>
                  </button>
                  <button
                    className={`btn ${isRecording ? "btn-danger" : "btn-success"}`}
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    <i className={`bi ${isRecording ? "bi-stop-circle" : "bi-mic"}`}></i>
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
