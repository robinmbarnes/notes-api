import NotFoundError from 'errors/not-found-error';
import ramda from 'ramda';

export default function * (next) {
  try {
    yield next;
  } catch (err) {
    if (ramda.is(NotFoundError, err)) {
      this.response.status = 404;
    }
  }
}
