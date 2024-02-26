export const commentsToAlice = "http://localhost:3001/messagesFromAlice";
export const commentsToSergio = "http://localhost:3001/messagesFromSergio";
export const commentsToBarrera = "http://localhost:3001/messagesFromBarrera";
export const commentsToVelasqez = "http://localhost:3001/messagesFromVelasqez";
export const commentsToMia = "http://localhost:3001/messagesFromMia";
export const sortedUsers = process.env.REACT_APP_SORTED_USERS;
const jokes = process.env.REACT_APP_JOKES;

export const addComment = (toUser, date, comment, chuck) => {
  fetch(toUser, {
    method: "POST",
    body: JSON.stringify({
      comment,
      date,
      chuck,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(
        `${data.comment} має id ${data.id} і відправлено ${data.date}`
      );
    });
};

export const changeLastMessage = async (
  url,
  id,
  avatar,
  date,
  comment,
  name
) => {
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      id,
      name,
      date,
      avatar,
      message: comment,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {});
};

export const getUserList = async (url) => {
  const response = await fetch(url);
  const data = await response.json().catch((err) => {
    console.error(err);
  });
  return data;
};

export const chuckNorris = async () => {
  const response = await fetch(jokes);
  const data = await response.json().catch((err) => {
    console.error(err);
  });
  return data;
};

export const getListOfMessages = async (url) => {
  const response = await fetch(url);
  const data = await response.json().catch((err) => {
    console.error(err);
  });
  return data;
};
