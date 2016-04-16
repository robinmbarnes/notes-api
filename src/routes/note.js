import Note from 'model/note';
import { updateModelFields } from 'utils/model';
import ramda from 'ramda';

export default function addNoteRoutes (router) {
  router
    .get('retrieveNote', '/notes/:id', retrieve)
    .get('listNotes', '/notes', list)
    .post('createNote', '/notes', create)
    .put('updateNote', '/notes/:id', update)
    .delete('removeNote', '/notes/:id', remove);
}

export function * retrieve () {
  this.body = yield Note.findById(this.params.id);
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
  const postData = ramda.omit(['_id'], this.request.body);
  updateModelFields(note, postData);
  yield note.save();
  this.body = note;
}

export function * remove () {
  const note = yield Note.findById(this.params.id);
  yield Note.delete({ _id: note._id });
}
