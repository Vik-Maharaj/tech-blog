const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// GET route for all posts
router.get('/', (req, res) => {
    Post.findAll({ 
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                } 
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData)) 
    .catch(err => res.status(500).json(err));
});


// GET route for a single post
router.get('/:id', (req, res) => {

    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Post ID not found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
});


// POST route for a post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbUserData => {
        res.json(dbUserData)})
    .catch(err => res.status(500).json(err));
});


// PUT route for a post
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content,
            created_at: req.body.created_at
        },
        {
            where: {
            id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Post ID not found' });
            return;
        }
         res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
});


// DELETE route for a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Post ID not found' });
            return;
        }

        res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
