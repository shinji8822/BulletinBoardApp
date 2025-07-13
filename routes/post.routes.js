const express = require("express");
const router = express.Router();
const db = require("../models");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../public/uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
  // filename: (req, file, cb) => {
  //   // ファイル名を安全に扱い、文字化け対策として base64 エンコード
  //   const originalName = Buffer.from(file.originalname, 'utf8').toString('base64');
  //   const safeName = Date.now() + "-" + originalName;
  //   cb(null, safeName);
  // }
});
const upload = multer({ storage });
const fs = require("fs");

// 一覧表示
router.get("/", async (req, res) => {
  const posts = await db.posts.findAll({ order: [["createdAt", "DESC"]] });
  res.render("index", { posts });
});

// 投稿処理
router.post("/posts", upload.single("file"), async (req, res, next) => {
  try {
    console.log("受け取ったファイル:", req.file);
    const { title, content } = req.body;
    const filePath = req.file ? "/uploads/" + req.file.filename : null;
    await db.posts.create({ title, content, filePath });
    res.redirect("/");
  } catch (err) {
    console.error("投稿エラー:", err);
    next(err);  // Express のエラーハンドラへ渡す
  }
});

// 編集フォーム表示
router.get("/posts/:id/edit", async (req, res, next) => {
  try {
    const post = await db.posts.findByPk(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.render("edit", { post });
  } catch (err) {
    next(err);
  }
});

// 編集処理（ファイルも受け付ける）
router.post("/posts/:id/update", upload.single("file"), async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await db.posts.findByPk(req.params.id);
    if (!post) return res.status(404).send("Post not found");

    let updateData = { title, content };

    if (req.file) {
      const newFilepath = "/uploads/" + req.file.filename;

      // 以前のファイルが存在すれば削除（オプション）
      if (post.filePath) {
        const oldPath = path.join(__dirname, "../public", post.filePath);
        fs.unlink(oldPath, (err) => {
          if (err) console.warn("以前のファイル削除エラー:", err.message);
        });
      }

      updateData.filePath = newFilepath;
    }

    await db.posts.update(updateData, {
      where: { id: req.params.id }
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// 削除処理
router.post("/posts/:id/delete", async (req, res, next) => {
  try {
    await db.posts.destroy({ where: { id: req.params.id } });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

// アップロードテスト
router.post("/test-upload", upload.single("file"), (req, res) => {
  if (req.file) {
    console.log("アップロード成功:", req.file);
    res.send("アップロード成功: " + req.file.filename);
  } else {
    res.send("ファイルがありません");
  }
});

module.exports = router;
