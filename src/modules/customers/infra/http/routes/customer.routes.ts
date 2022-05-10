import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CustomerController from '../controllers/CurtomerController';

const usersRouter = Router();
const customerController = new CustomerController();



usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            register_number: Joi.string().required(),
            state_registration: Joi.string().allow('', null),
            name_responsible: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            zipcode: Joi.string().required(),
            address: Joi.string().required(),
            number: Joi.number().required(),
            complement: Joi.string().required(),
            district: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            user: Joi.string().required(),
            password: Joi.string().required(),
            passwordConfirmation: Joi.string().required(),
            PlanOne: Joi.boolean().required(),
            PlanTwo: Joi.boolean().required(),
            PlanThree: Joi.boolean().required(),
        },
    }),
    customerController.create,
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
);

export default usersRouter;
