# BulletinBoardApp

## Node.js + Express + Sequelize (MySQL) + Bootstrap 環境セットアップ手順（ローカル開発環境）
### MySQLにデータベース作成:

```
mysql -u root -p
CREATE DATABASE bulletin_board CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

### 必要パッケージのインストール:

```
npm init -y
npm install express sequelize mysql2 ejs express-ejs-layouts
```

### server.js を実行:

```
node server.js
```

### systemdファイル作成:

```
cat <<'EOF' |sudo tee /etc/systemd/system/bulletin-board.service
[Unit]
Description=Bulletin Board Node.js App
After=network.target

[Service]
ExecStart=/home/shinji/.nvm/versions/node/v22.17.0/bin/node /home/shinji/bulletin_board/server.js
WorkingDirectory=/home/shinji/bulletin_board
Restart=always
RestartSec=5
Environment=NODE_ENV=production
User=shinji
Group=shinji

[Install]
WantedBy=multi-user.target
EOF
```

### systemd をリロード & 有効化
```
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable bulletin-board
sudo systemctl start bulletin-board
```
