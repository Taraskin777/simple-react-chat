import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNewComment, sendMessage } from "../../store/userDataSlice";
import "./inputforsendmessage.css";

const InputForSendMessage = ({
  // onSendMessage,
}) => {
  const {newComment, id, avatar, name, chuck} = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const onSendMessage = (e) => {
    e.preventDefault();
    dispatch(sendMessage({ id, newComment, chuck, avatar, name }));
  };

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
