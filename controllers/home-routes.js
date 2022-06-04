const router = require('express').Router();
const { Post, User, Comment } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    console.log(req.session);

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
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('homepage', 
            { 
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
                dashboard: true,
                loginPage: true,
                signUpPage: true,
                dashboardPage: true
            }
        );
    })
    .catch(err => res.status(500).json(err));
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login',
        {
            loginPage: false,
            signUpPage: true
        }
    );
});


router.get('/sign-up', (req, res) => {
    res.render('sign-up',
        {
            signUpPage: false,
            loginPage: true
        }
    );
});


router.get('/posts/:id', (req, res) => {

    Post.findOne({
        where: {
            id: req.params.id
        },
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
                attributes: ['id', 'username'],
            }
        ]
    })
    .then(dbPostData => {

        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });

        let canEdit;
        if(post.user_id === req.session.user_id) {
            canEdit = true;
        }
        else {
            canEdit = false;
        }

        post.comments.forEach(comment => {
            if (comment.user_id == req.session.user_id) {
                comment.can_delete = true;
            }
        });

        console.log('tHIS IS THE POST', post);

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            canEdit,
            loginPage: true,
            signUpPage: true,
            dashboardPage: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/dashboard', withAuth, (req, res) => {
    if (!req.session) {
        res.redirect('/');
        return;
    }

    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard',
            {
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
                dashboardPage: false
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/create-post', withAuth, (req, res) => {
    if (!req.session) {
        res.redirect('/');
        return;
    }
    
    res.render('create-post', 
        {   
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            dashboardPage: true
        }
    );
});


router.get('/edit-post/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
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
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            
            res.render('edit-post', {
                post,
                loggedIn: true,
                username: req.session.username,
                dashboardPage: true
            });
        } 
        else {
            res.status(404).end();
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });

});

module.exports = router;