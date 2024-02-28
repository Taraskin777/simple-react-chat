import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNewComment } from "../../store/userDataSlice";
import "./inputforsendmessage.css";

const InputForSendMessage = ({
  onSendMessage,
}) => {
  const newComment = useSelector((state) => state.data.newComment);

  const dispatch = useDispatch();

  const onMessageValue = (e) => {
    dispatch(setNewComment(e.target.value));
  };

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
