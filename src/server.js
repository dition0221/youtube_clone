/* Package */
import express from "express";
import morgan from "morgan";
import session from "express-session";
/* Middleware */
import { localsMiddleware } from "./middlewares";
/* Router */
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

/* 서버 생성*/
const app = express();

/* Middleware : Morgan logger 사용 설정 */
const logger = morgan("dev");
app.use(logger);

/* Pug 패키지 사용 설정 */
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); // 경로 수정

/* Middleware : POST 데이터를 수신 */
app.use(express.urlencoded({ extended: true }));

/* Middleware : Session (express-session) */
app.use(
  session({
    secret: "hi",
    resave: true,
    saveUninitialized: true,
  })
);

/* Middleware : locals 전역변수 */
app.use(localsMiddleware);

/* Router */
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
