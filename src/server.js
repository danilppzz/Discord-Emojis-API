import Express from "express";
import { searchEmoji, readAllEmoji, removeEmoji, insertEmoji } from "../sqlite3.js";

const app = Express();

app.get("/", (req, res) => {
  res.json({
    status: 200,
    version: "1.0.0",
    license: ["https://github.com/danilppzz/danilppzz/blob/main/LICENSE"],
  });
});

app.get("/emojis", async (req, res) => {
  res.json(await readAllEmoji());
});

app.get("/emojis/:search", async (req, res) => {
  const search = req.params.search;
  const type = req.query.type;
  let types = "title";

  const validTypes = ["title", "url", "id"];
  if (type in validTypes)
    return res.status(400).json({ status: 400, message: "Invalid type param." });
  if (typeof search === "number") types = "id";
  if (type == null) return res.redirect(`/emojis/${search}?type=${types}`);
  res.json(await searchEmoji(search, type));
});

app.delete("/emojis/:id", async (req, res) => {
  const id = req.params.id;
  res.json(await removeEmoji(id));
});

app.post("/emojis", async (req, res) => {
  const title = req.query.title;
  const url = req.query.url;

  const regex = /^https:\/\/cdn\.discordapp\.com\/emojis\/[^\/?]+\.(gif)(\?.*)?$/;

  if (title.length > 20)
    res
      .status(400)
      .json({ status: 400, message: "The title cannot be higher than 20 characters." });

  if (!regex.test(url) || url.endsWith('/')) {
    return res.status(400).json({ status: 400, message: "Invalid emoji URL." });
  }

  // Validar que no hayan dos url iguales //
  res.json(await insertEmoji(title, url));
});

app.listen(3000);
