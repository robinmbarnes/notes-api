import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String,
  body: String,
  position: Number
});

const Note = mongoose.model('note', schema);

export default Note;

export function * updatePositions (currentPosition, newPosition) {
  if (currentPosition === newPosition) {
    return;
  }
  if (currentPosition === void 0) {
    return yield Note.update({}, { $inc: { position: 1 } });
  }
  if (newPosition === void 0) {
    console.log('here');
    return yield Note.update(
      { position: { $gt: currentPosition } },
      { $inc: { position: -1 } }
    );
  }
  if (newPosition < currentPosition) {
    return yield Note.update(
      { position: { $gte: newPosition, $lt: currentPosition } },
      { $inc: { position: 1 } }
    );
  }
  return yield Note.update(
    { position: { $lte: newPosition, $gt: currentPosition } },
    { $inc: { position: -1 } }
  );
}
