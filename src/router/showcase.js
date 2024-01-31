import Express from "express";
import { readAllEmoji } from "../sqlite3.js";

const router = Express.Router();

router.get("/showcase", async (req, res) => {
  const objects = await readAllEmoji();
  res.render('emojis', { objects: objects });
});

export { router as showcase };
