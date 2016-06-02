import Note from 'model/note';
import { updatePositions } from 'model/note';
import { updateModelFields } from 'utils/model';
import ramda from 'ramda';
import NotFoundError from 'errors/not-found-error';

export default (router) =>
  router
    .get('retrieveNote', '/notes/:id', retrieve)
    .get('listNotes', '/notes', list)
    .post('createNote', '/notes', create)
    .put('updateNote', '/notes/:id', update)
    .delete('removeNote', '/notes/:id', remove);

export function * retrieve () {
  const note = yield Note.findById(this.params.id);
  if (!note) {
    throw new NotFoundError();
  }
  this.body = note;
}

export function * list () {
  this.body = yield Note.find().sort({ position: -1 });
}

export function * create () {
  let position = 0;
  try {
    const maxPositionResult = yield Note.aggregate({
      $group: {
        _id: 0,
        maxPosition: { $max: '$position' }
      }
    }).exec();
    const [{ maxPosition }] = maxPositionResult;
    position = maxPosition + 1;
  } catch (err) {
    // Don't care, just means there are 0 notes
  }
  const note = new Note(Object.assign({}, this.request.body, { position }));
  yield updatePositions(void 0, position);
  yield note.save();
  this.body = note;
}

export function * update () {
  const note = yield Note.findById(this.params.id);
  if (!note) {
    throw new NotFoundError();
  }
  const postData = ramda.omit(['_id'], this.request.body);
  const currentPosition = note.position;
  const newPosition = postData.position;
  updateModelFields(note, postData);
  yield updatePositions(currentPosition, newPosition);
  yield note.save();
  this.body = note;
}

export function * remove () {
  const note = yield Note.findById(this.params.id);
  if (!note) {
    throw new NotFoundError();
  }
  yield updatePositions(note.position);
  yield Note.remove({ _id: note._id });
  this.response.status = 204;

}
