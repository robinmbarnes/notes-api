import mongoose from 'mongose';

const schema = mongoose.Schema({
  title: String,
  body: String
});

export default mongoose.Model('note', schema);
