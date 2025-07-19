const bcrypt = require('bcryptjs');
const { createUser, findUserByUsername } = require('../model/userModel');

exports.getHome = (req, res) => res.render('home', { user: req.session.user });

exports.getLogin = (req, res) => res.render('login', { error: null });

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    return res.redirect('/dashboard');
  }
  return res.render('login', { error: 'Invalid credentials' });
};

exports.getRegister = (req, res) => res.render('register', { error: null });

exports.postRegister = (req, res) => {
  const { name, username, email, password } = req.body;
  if (findUserByUsername(username)) {
    return res.render('register', { error: 'Username already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = {
    userid: Date.now(),
    name,
    username,
    email,
    password: hashedPassword
  };

  createUser(user);
  return res.redirect('/login');
};

exports.getDashboard = (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('dashboard', { user: req.session.user });
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};
