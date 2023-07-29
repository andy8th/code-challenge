const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    allowNull: false
  },
  PostId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Posts',
      key: 'id',
    },
    allowNull: false
  }
});

Comment.belongsTo(User);
Comment.belongsTo(Post);
Post.hasMany(Comment);
User.hasMany(Comment);

module.exports = Comment;
