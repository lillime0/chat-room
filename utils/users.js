const users = [];
//const users = new Set()

export const getUser = id => users.find(user => user.id === id);

export const addUser = ({ id, username, room }) => {
  if (!username || !room)
    return { error: "Username and room are both required" };
  username = username.trim();
  room = room.trim();
  const existingUser = users.find(
    user => user.username === username && user.room === room
  );
  if (existingUser)
    return { error: "Username is already taken within this room" };
  const user = { id, username, room };
  users.push(user);
  return { user };
};

export const removeUser = id => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

export const getRoomUsers = room => users.filter(user => user.room === room);
