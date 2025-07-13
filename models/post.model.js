module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,         // NULLを許可
      defaultValue: '匿名',    // デフォルト値を設定
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: true, // ファイルがない投稿も許可
    }
  });
  return Post;
};
