import mongoose from "mongoose";

/* Video model의 형식(Schema) 지정 */
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, default: Date.now, required: true }, // 1970년도부터 지금까지의 ms
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

/* Video model 선언 */
const Video = mongoose.model("Video", videoSchema);

export default Video;
