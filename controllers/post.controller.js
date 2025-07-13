const db = require("../models");
const Post = db.posts;

exports.create = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) res.json(post);
    else res.status(404).json({ message: "見つかりません" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Post.update(req.body, { where: { id: req.params.id } });
    if (result[0] > 0) res.json({ message: "更新成功" });
    else res.status(404).json({ message: "対象が見つかりません" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Post.destroy({ where: { id: req.params.id } });
    if (result > 0) res.json({ message: "削除成功" });
    else res.status(404).json({ message: "対象が見つかりません" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
