const users = [];

module.exports.addUser = (userParam) => {
  let existingUser 
  existingUser = users.find(
    (user) => user.email === userParam.email
  )
    
  if (existingUser) return { error: 'Username is taken.' }
  users.push(userParam)
  return { userParam }
};

module.exports.getUser = (id) =>  users.find((user) => user._id === id)

module.exports.getUsers = () => users

module.exports.removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    const removedUser = users[index]
    users.splice(index, 1)[0]
    return removedUser
  }
  return null
};