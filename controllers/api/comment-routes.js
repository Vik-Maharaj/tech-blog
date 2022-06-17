const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');


// GET route for comments
router.get('/', (req, res) => {
    Comment.findAll({
        order: [['created_at', 'DESC']],
        include: [
            {
              model: User,
              attributes: ['username']
            }
        ]
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});


// POST route for comments
router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id 
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});


// DELETE route for comments
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'Comment ID not found' });
          return;
        }
        res.json(dbCommentData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;