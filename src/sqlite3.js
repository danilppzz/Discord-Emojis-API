import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./server.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
});

// Create Table
function createTableUsers() {
  db.run(`CREATE TABLE emojis(id INTEGER PRIMARY KEY, emoji_title, emoji_url)`);
}

// Emoji Manage
export async function insertEmoji(title, url) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO emojis(emoji_title, emoji_url) VALUES (?,?)`, [title, url], function (err) {
      if (err) {
        reject(err.message);
      } else {
        resolve({ id: this.lastID, title, url });
      }
    });
  });
}

export async function removeEmoji(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM emojis WHERE id = ?`, [id], (err) => {
      if (err) {
        reject(err.message);
      } else {
        resolve("Emoji removed successfully");
      }
    });
  });
}

export async function searchEmoji(data, to_find) {
  return new Promise((resolve, reject) => {
    let type = to_find;

    switch (to_find) {
      case "title":
        type = `emoji_title`;
        break;
      case "url":
        type = `emoji_url`;
        break;
      case "id":
        type = `id`;
        break;
      default:
        type = "emoji_title";
    }

    db.all(`SELECT * FROM emojis WHERE ${type} LIKE ? || '%'`, [data], (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function readAllEmoji() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM emojis`, [], (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
}
