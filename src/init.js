/* DB */
import "./db";
/* DB Model */
import Video from "./models/video";
/* Server */
import app from "./server";

// 서버의 PORT번호
const PORT = 4000;

/* 서버 실행 */
app.listen(PORT, () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} !`)
);
