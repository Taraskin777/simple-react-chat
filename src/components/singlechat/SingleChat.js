import React, { useEffect } from 'react';
import ChatOfSingleUser from '../chatOfSingleUser/ChatOfSingleUser';
import InputForSendMessage from '../inputForSendMessage/InputForSendMessage';
import { getListOfMessages } from '../../services/httpservices';
import { useDispatch } from 'react-redux';
import { setMessagesList } from '../../store/userDataSlice';
import './singlechat.css';
import { useSelector } from 'react-redux';

const SingleChat = () => {
  const dispatch = useDispatch();

  const { name, avatar, id, messagesList, newComment } = useSelector(
    (state) => state.data
  );

  const messageFromUser = process.env.REACT_APP_MESSAGES_FROM_USER;

  useEffect(() => {
    getListOfMessages(`${messageFromUser}${id}`)
      .then((data) => dispatch(setMessagesList(data)))
      .catch((error) => console.log(error));
  }, [id, newComment]);

  return (
    <div className='chat'>
      <div className='userinfo'>
        <div className='user-avatar'>
          <img src={avatar ? avatar : '/images/sergio.png'} alt='avatar' />
          <div className='user-tick'>
            <img src='/images/tick.png' alt='tick' />
          </div>
        </div>
        <h2>{name ? name : 'Sergio'}</h2>
      </div>
      <div className='single-chat-wrapper' id='chatscroll'>
        {messagesList.map(({ id, comment, date, chuck }) => (
          <div key={id}>
            <ChatOfSingleUser
              comment={comment}
              date={date}
              avatar={avatar}
              chuck={chuck}
            />
          </div>
        ))}
      </div>
      <InputForSendMessage newComment={newComment} id={id} />
    </div>
  );
};

export default SingleChat;
