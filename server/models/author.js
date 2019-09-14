import mongoose from "mongoose";

const Schema = mongoose.Schema;
const authorSchema = new Schema({
  // FIXME:
  // intentionally set this _id manuall due to relationship with books
  // subject to iteration
  _id: mongoose.Types.ObjectId,
  name: String,
  books: Array // book ids
});

export default mongoose.model("author", authorSchema);
