const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dataPath = path.join(__dirname, '../../data/users.json');

function getUsers() {
  const data = fs.existsSync(dataPath) ? fs.readFileSync(dataPath, 'utf-8') : '[]';
  return Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
}

function saveUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

function createUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
}

function findUserByUsername(username) {
  const users = getUsers();
  return users.find(user => user.username === username);
}

module.exports = { getUsers, createUser, findUserByUsername };
