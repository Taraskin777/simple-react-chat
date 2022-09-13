import React from "react";
import "./inputforsendmessage.css";

const InputForSendMessage = () => {
  return (
    <>
      <div className="input-for-message">
        <div className="input-wrapper">
          <input type="text" placeholder="Type your message" />
          <div className="sendmessage"></div>
        </div>
      </div>
    </>
  );
};

export default InputForSendMessage;
