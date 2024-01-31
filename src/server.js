import Express from "express";

import * as path from "node:path";
import * as url from "node:url";

import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger.js";
import swaggerJsdoc from "swagger-jsdoc";

import { showcase } from "./router/showcase.js";
import { emojis } from "./router/emojis.js";

const app = Express();

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/", (req, res) => {
  res.json({
    status: 200,
    version: "1.0.3",
    links: {
      LICENSE: "https://github.com/danilppzz/danilppzz/blob/main/LICENSE",
      DOCS: "http://localhost:3000/docs",
    },
  });
});

app.use("/", showcase);

app.use("/", emojis);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3000);
