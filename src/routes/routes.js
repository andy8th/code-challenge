const express = require('express');

const userController = require('../controllers/userController')
const postController = require('../controllers/postController');

const commentController = require('../controllers/commentController'); 
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

// User routes
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);

// Post routes
router.post('/posts', authMiddleware, postController.createPost);
router.get('/posts', authMiddleware, postController.getPosts);

router.patch('/posts/:postId', authMiddleware, postController.updatePost);

router.post('/posts/:postId/comments', authMiddleware, commentController.createComment);

router.get('/posts/:postId/comments', authMiddleware, commentController.getComments);


module.exports = router;
