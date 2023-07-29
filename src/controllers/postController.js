const moment = require('moment');
const Post = require('../models/Post');
const Photo = require('../models/Photo'); // Require Photo model
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
    try {
        const { title, description, photos } = req.body;
        
        if (photos && photos.length > 5) {
            return res.status(400).json({
                status: 'fail',
                message: "You can only add up to 5 photos"
            });
        }

        const post = await Post.create({
            title,
            description,
            UserId: req.user.id
        });

        // If photos exist, create them separately
        if (photos && photos.length > 0) {
            for (let photoUrl of photos) {
                await Photo.create({ PostId: post.id, url: photoUrl });
            }
        }

        res.status(201).json({
            status: 'success',
            data: {
                post
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
exports.getPosts = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;  // default page is 1
      const limit = parseInt(req.query.limit) || 10; // default limit is 10
      const offset = (page - 1) * limit;

      const posts = await Post.findAll({
          where: { UserId: req.user.id },
          include: Photo, // Include associated photos in the response
          limit: limit,
          offset: offset,
          order: [['createdAt', 'DESC']]
      });

      // Format the createdAt date
      posts.forEach(post => {
          post.dataValues.createdAt = moment(post.createdAt).fromNow();
      });

      res.status(200).json({
          status: 'success',
          data: {
              posts
          }
      });
  } catch (error) {
      res.status(400).json({
          status: 'fail',
          message: error.message
      });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const { title, description, photos } = req.body;
    const post = await Post.findOne({ where: { id: req.params.postId, UserId: req.user.id } });

    if (!post) {
      return res.status(404).json({ status: 'fail', message: 'No post found with this id.' });
    }

    if (photos && photos.length > 5) {
      return res.status(400).json({
        status: 'fail',
        message: "You can only add up to 5 photos"
      });
    }

    await post.update({ title, description });

    if (photos) {
      // Delete all existing photos
      await Photo.destroy({ where: { PostId: post.id } });

      // Add new photos
      for (let photoUrl of photos) {
        await Photo.create({ PostId: post.id, url: photoUrl });
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        post
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};


exports.createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findOne({ where: { id: req.params.postId } });

    if (!post) {
      return res.status(404).json({ status: 'fail', message: 'No post found with this id.' });
    }

    const comment = await Comment.create({
      text,
      UserId: req.user.id,
      PostId: post.id
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
