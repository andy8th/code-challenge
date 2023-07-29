const moment = require('moment');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/user');

exports.createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const post = await Post.findByPk(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const comment = await Comment.create({
      text,
      UserId: req.user.id,
      PostId: postId
    });

    res.status(201).json({
      status: 'success',
      data: {
        comment
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getComments = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;  // default page is 1
      const limit = parseInt(req.query.limit) || 10; // default limit is 10
      const offset = (page - 1) * limit;

      const comments = await Comment.findAll({
          where: { PostId: req.params.postId },
          limit: limit,
          offset: offset,
          order: [['createdAt', 'DESC']],
          include: User // Include associated user in the response
      });

      // Format the createdAt date
      comments.forEach(comment => {
          comment.dataValues.createdAt = moment(comment.createdAt).fromNow();
      });

      res.status(200).json({
          status: 'success',
          data: {
              comments
          }
      });
  } catch (error) {
      res.status(400).json({
          status: 'fail',
          message: error.message
      });
  }
};