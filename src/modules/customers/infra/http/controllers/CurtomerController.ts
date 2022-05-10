import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { v4 } from 'uuid';
import CreateCustomerService from '../../../services/CreateCustomerService';
import CreateUserService from '../../../../users/services/CreateUserService';

export default class CustomersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            register_number,
            state_registration,
            name_responsible,
            email,
            phone,
            zipcode,
            address,
            number,
            complement,
            district,
            city,
            state,
            user,
            password,
            PlanOne,
            PlanTwo,
            PlanThree,
        } = request.body;


        const createCustomer = container.resolve(CreateCustomerService);

        const customer = await createCustomer.execute({
            name,
            register_number,
            state_registration,
            name_responsible,
            email,
            phone,
            zipcode,
            address,
            number,
            complement,
            district,
            city,
            state,
        });


        const createUser = container.resolve(CreateUserService);


        const User = await createUser.execute({
            id: v4(),
            email,
            name : user,
            password
        });
        console.log('TESTE ', User)

        return response.json(customer);
    }
}
