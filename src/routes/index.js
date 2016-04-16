import Router from 'koa-router';
import { compose } from 'ramda';

import addNoteRoutes from './note';

const addRoutes = compose(addNoteRoutes);

export default addRoutes(new Router());
