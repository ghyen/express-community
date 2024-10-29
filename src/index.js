import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import testRoutes from "./routes/route.js";
import { rateLimitMiddleware } from "./middleware/rateLimitMiddleware.js";
import { timeoutMiddleware } from "./middleware/timeoutMiddleware.js";
import {
  helmetMiddleware,
  cspMiddleware,
} from "./middleware/securityMiddleware.js";
import { loggingMiddleware } from "./middleware/loggingMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 미들웨어 적용
app.use(helmetMiddleware);
app.use(cspMiddleware);
app.use(loggingMiddleware);
app.use(rateLimitMiddleware);
app.use(express.static(__dirname));
app.use(timeoutMiddleware);

// 라우터 적용
app.use("/", testRoutes);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});

export default app;
