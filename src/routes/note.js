import Note from 'model/note';
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
  this.body = yield Note.find();
}

export function * create () {
  const note = new Note(this.request.body);
  yield note.save();
  this.body = note;
}

export function * update () {
  const note = yield Note.findById(this.params.id);
  if (!note) {
    throw new NotFoundError();
  }
  const postData = ramda.omit(['_id'], this.request.body);
  updateModelFields(note, postData);
  yield note.save();
  this.body = note;
}

export function * remove () {
  const note = yield Note.findById(this.params.id);
  if (!note) {
    throw new NotFoundError();
  }
  yield Note.remove({ _id: note._id });
  this.response.status = 204;

}
