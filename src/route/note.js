import Note from 'model/note';

export default (router) =>
  router
    .get('/note', list)
    .get('/note/:id', retrieve)
    .post('/note', create)
    .put('/note/:id', update)
    .delete('/note/:id', remove);

export function * list () {
  const notes = yield Note.find();
}

export function * retrieve () {
  const note = yield Note.findById(this.params.id);
}

export function * create () {

}

export function * update () {

}

export function * remove () {

}
