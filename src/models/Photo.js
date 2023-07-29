const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./Post');

const Photo = sequelize.define('Photo', {
  url: {
    type: DataTypes.STRING,
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

Photo.belongsTo(Post);
Post.hasMany(Photo);

module.exports = Photo;
