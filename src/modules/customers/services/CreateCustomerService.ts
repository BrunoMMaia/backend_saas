import { injectable, inject } from 'tsyringe';
// import { hash } from 'bcryptjs';
import { v4 } from 'uuid';
import AppError from '../../../shared/errors/AppError';
import ICustomerRepository from '../repositories/ICustomerRepository';
import Customer from '../infra/typeorm/entities/customer';

interface IRequest {
    name: string;
    register_number: string;
    state_registration?: string;
    name_responsible: string;
    email: string;
    phone: string;
    zipcode: string;
    address: string;
    number: number;
    complement: string;
    district: string;
    city: string;
    state: string;
}

@injectable()
class CreateCustomerService {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,
    ) {}

    public async execute({
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
    }: IRequest): Promise<Customer> {
        const checkUserExists = await this.customerRepository.findByEmail(
            email,
        );
        if (checkUserExists) {
            throw new AppError('E-mail address already taken');
        }

        const customer = await this.customerRepository.create({
            id: v4(),
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
        return customer;
    }
}

export default CreateCustomerService;
