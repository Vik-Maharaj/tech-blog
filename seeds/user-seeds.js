const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'markj',
    password:'password123',
    email:'markj@testmail.com',
  },
  {
    username:'tonyt',
    password:'password123',
    email:'tonyt@testmail.com'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;