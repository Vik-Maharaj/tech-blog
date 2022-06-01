const { Post } = require('../models');



const seedPosts = () => Post.bulkCreate(postinfo);

module.exports = seedPosts;