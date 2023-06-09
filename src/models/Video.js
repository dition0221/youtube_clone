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

/* Middleware : hashtags 정렬 */
// Video.formatHashtags(hashtags)
videoSchema.static("formatHashtags", (hashtags) => {
  return hashtags.split(",").map(
    (word) =>
      word.trim().startsWith("#") // '#'기호의 유무 판별
        ? `#${word.replace(/#/g, "").trim()}` // 모든 '#'기호를 없음으로 대체 후 공백처리
        : `#${word.trim()}` // 공백처리
  );
});

/* Video model 선언 */
const Video = mongoose.model("Video", videoSchema);

export default Video;
