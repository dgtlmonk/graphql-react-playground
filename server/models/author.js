import mongoose from 'mongoose';

const {Schema} = mongoose;
const authorSchema = new Schema({
  // FIXME:
  // intentionally set this _id manuall due to relationship with books
  // subject to iteration
  _id: mongoose.Types.ObjectId,
  name: String,
  books: Array, // book query result
});

export default mongoose.model('author', authorSchema);
