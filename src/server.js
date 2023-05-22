/* Package */
import express from "express";
import morgan from "morgan";
/* Router */
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

/* 서버 생성*/
const app = express();

/* 외부 패키지 Morgan logger 사용 설정 */
const logger = morgan("dev");
app.use(logger);

/* Pug 패키지 사용 설정 */
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); // 경로 수정

/* POST 데이터를 수신하는 미들웨어 */
app.use(express.urlencoded({ extended: true }));

/* Router */
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
