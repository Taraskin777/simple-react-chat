export const commentsToAlice = "http://localhost:3001/messagesFromAlice";
export const commentsToSergio = "http://localhost:3001/messagesFromSergio";
export const commentsToBarrera = "http://localhost:3001/messagesFromBarrera";
export const commentsToVelasqez = "http://localhost:3001/messagesFromVelasqez";
export const commentsToMia = "http://localhost:3001/messagesFromMia";
export const sortedUsers = "http://localhost:3001/users?_sort=date&_order=desc";
const jokes = "https://api.chucknorris.io/jokes/random";

export const addComment = (toUser, date, comment, chuck) => {
  fetch(toUser, {
    method: "POST",
    body: JSON.stringify({
      comment: comment,
      date: date,
      chuck: chuck,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(
        `${data.comment} має id ${data.id} і відправлено ${data.date}`
      );
    });
};

export const changeLastMessage = async (
  url,
  id,
  avatar,
  tick,
  date,
  comment,
  name
) => {
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      name: name,
      date: date,
      avatar: avatar,
      message: comment,
      tick: tick,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
};

export const getUserList = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const chuckNorris = async () => {
  const response = await fetch(jokes);
  const data = await response.json();
  return data;
};

export const getListOfMessages = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
