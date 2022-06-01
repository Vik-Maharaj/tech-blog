const { Comment } = require('../models');


const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;