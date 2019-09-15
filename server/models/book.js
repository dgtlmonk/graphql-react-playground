import mongoose from "mongoose";

const Schema = mongoose.Schema;
const bookSchema = new Schema({
  name: String,
  authorId: String,
  genre: String
});

export default mongoose.model("book", bookSchema);
