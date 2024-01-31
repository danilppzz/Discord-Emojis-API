import Express from "express";

import { searchEmoji, readAllEmoji, removeEmoji, insertEmoji } from "../sqlite3.js";

const router = Express.Router();

router.use("/emojis", (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (
    (req.method === "POST" || req.method === "DELETE") &&
    apiKey &&
    apiKey === "yNxkPSyktVoJ6E7S"
  ) {
    next();
  } else if (req.method !== "POST" && req.method !== "DELETE") {
    next();
  } else {
    res.status(403).send("Unauthorized access.");
  }
});

router.get("/emojis", async (req, res) => {
  res.json(await readAllEmoji());
});

router.get("/emoji", async (req, res) => {
  res.redirect(`/emojis`);
});

router.get("/emojis/:search", async (req, res) => {
  const search = req.params.search;
  const type = req.query.type;
  let types = "title";

  const validTypes = ["title", "url", "id"];
  if (type in validTypes)
    return res.status(400).json({ status: 400, message: "Invalid type param." });
  if (/^\d+$/.test(search)) types = "id";
  if (type == null) return res.redirect(`/emojis/${search}?type=${types}`);
  res.json(await searchEmoji(search, type));
});

router.delete("/emojis/:id", async (req, res) => {
  const id = req.params.id;
  res.json(await removeEmoji(id));
});

router.post("/emojis", async (req, res) => {
  const title = req.query.title;
  const url = req.query.url;

  const regex = /^https:\/\/cdn\.discordapp\.com\/emojis\/[^\/?]+\.(gif)(\?.*)?$/;

  if (title.length > 20)
    res
      .status(400)
      .json({ status: 400, message: "The title cannot be higher than 20 characters." });

  if (!regex.test(url) || url.endsWith("/")) {
    return res.status(400).json({ status: 400, message: "Invalid emoji URL." });
  }

  // Validar que no hayan dos url iguales //
  res.json(await insertEmoji(title, url));
});

export { router as emojis };
