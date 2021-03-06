import { Router } from 'express';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import customersRouter from '../../../../modules/customers/infra/http/routes/customer.routes';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/newrecord', customersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
