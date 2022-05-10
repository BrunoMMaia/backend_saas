import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/usersController';

// import ensureAuthorizedEvery from '../middlewares/ensureAuthorizedEvery';

const usersRouter = Router();
const userController = new UsersController();

// usersRouter.use(
//    ensureAuthenticated,
//    ensureAuthorizedEvery([{ entity: 'groups', role: 'Administrator' }]),
// );

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            id: Joi.string().uuid().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    userController.create,
);

usersRouter.patch(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
        [Segments.BODY]: {
            password: Joi.string(),
        },
    }),
    userController.update,
);

export default usersRouter;
