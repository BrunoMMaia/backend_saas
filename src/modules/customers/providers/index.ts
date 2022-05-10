import { container } from 'tsyringe';

import CustomerRepository from '../infra/typeorm/repositories/CustomerRepository';
import ICustomerRepository from '../repositories/ICustomerRepository';

container.registerSingleton<ICustomerRepository>(
    'CustomerRepository',
    CustomerRepository,
);
