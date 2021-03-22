const users = [];

module.exports.addUser = ({ userParam }) => {
  const existingUser = users.find(
    (user) => user.email === userParam.email
  )

  if (existingUser) return { error: 'Username is taken.' }
  users.push(userParam)
  return { userParam }
};

module.exports.getUser = (id) => users.find((user) => user._id === id)

module.exports.getUsers = () => users

module.exports.removeUser = (id) => {
  const index = users.findIndex((user) => user._id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};