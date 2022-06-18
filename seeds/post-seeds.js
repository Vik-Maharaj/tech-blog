const { Post } = require('../models');

const postinfo = [
    {
        title: 'AiME Begins',
        content: `AI content creation means that a machine creates content for you. Today, AI content creation often refers to written content like blog posts, articles, and marketing copy. But AI is starting to show promise in creating audio and video, too. Humans give AI a prompt, description, or parameters.`,
        user_id: '1',
    },
    {
        title: 'AI Made Artistry',
        content: `artificial intelligence have captured the internet's attention. There is a certain appeal to seeing how an algorithm tackles something as subjective as art. In 2016, for example, actor Thomas Middleditch made a short film based on a script written by an algorithm. Google has produced more than a few tools tying art and AI together. In 2018, its Arts & Culture app let users find their doppelgangers in famous paintings. Or Googles Autodraw of whatever you are trying to doodle, and fix it up for you.`,
        user_id: '2',
    }
];

const seedPosts = () => Post.bulkCreate(postinfo);

module.exports = seedPosts;