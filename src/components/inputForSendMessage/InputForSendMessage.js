import React from "react";
import "./inputforsendmessage.css";

const InputForSendMessage = ({
  onSendMessage,
  onMessageValue,
  newComment,
  id,
}) => {

  return (
    <>
      <div className="input-for-message">
        <form className="form" onSubmit={onSendMessage}>
          <input
            type="text"
            placeholder="Type your message"
            autoFocus
            onChange={onMessageValue}
            value={newComment}
          />
          <button className="sendmessage" type="submit"></button>
        </form>
      </div>
    </>
  );
};

export default InputForSendMessage;
