export const sortedUsers = process.env.REACT_APP_SORTED_USERS;

const jokes = process.env.REACT_APP_JOKES;

export const addComment = (toUser, date, comment, chuck, id) => {
  fetch(toUser, {
    method: "POST",
    body: JSON.stringify({
      comment,
      date,
      chuck,
      userId: id,
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
  const data = await response.json();
  return data;
};

export const chuckNorris = async () => {
  const response = await fetch(jokes);
  const data = await response.json();
  return data;
};

export const getListOfMessages = async (url) => {
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
