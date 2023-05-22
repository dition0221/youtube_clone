import mongoose from "mongoose";

/* Video model의 형식(Schema) 지정 */
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

/* Video model 선언 */
const Video = mongoose.model("Video", videoSchema);

export default Video;
