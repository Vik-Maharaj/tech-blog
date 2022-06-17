const { Comment } = require('../models');


const commentdata = [
{
    comment_text:'Here we go!',
    user_id:'2',
    post_id:'1',
},
{
    comment_text:'This is absolutely fascinating.',
    user_id:'1',
    post_id:'2',
}


];
const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;