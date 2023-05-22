import mongoose from "mongoose";

/* DB 연결 */
mongoose.connect("mongodb://127.0.0.1:27017/wetube");

/* DB 연결 여부 log */
const db = mongoose.connection;
db.on("error", (error) => console.log("❌ DB Error", error));
db.once("open", () => console.log("✅ Connected to DB"));
