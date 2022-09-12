export const commentsToAlice = "http://localhost:3001/messagesFromAlice";
export const sortedUsers = "http://localhost:3001/users?_sort=date&_order=desc";
const jokes = "https://api.chucknorris.io/jokes/random";
const newComment = "new comment";


export const addComment = (toUser) => {
  fetch(toUser, {
    method: "POST",
    body: JSON.stringify({
      comment: newComment,
      date: new Date()
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
      console.log(`${data.comment} має id ${data.id} і відправлено ${data.date}`);
    });
};

export const getUserList = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const chuckNorris = () => {
  fetch(jokes)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.value);
    });
};