import { getRepository, Repository } from 'typeorm';
import ICustomerRepository from '../../../repositories/ICustomerRepository';
import ICreateCustomerDTO from '../../../dtos/ICreateCustomerDTO';
import Customer from '../entities/customer';

class CustomerRepository implements ICustomerRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = getRepository(Customer, 'db-postgres');
    }

    public async create(customerData: ICreateCustomerDTO): Promise<Customer> {
        const customer = this.ormRepository.create(customerData);

        await this.ormRepository.save(customer);

        return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        console.log('customer: ', customer);

        return this.ormRepository.save(customer);
    }

    // public async findById(id: string): Promise<Customer | undefined> {
    //     const customer = await this.ormRepository.findOne({
    //         where: { id },
    //         // relations: ['groups'],
    //     });

    //     return customer;
    // }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        const customer = await this.ormRepository.findOne({
            where: { email },
            // relations: ['groups'],
        });

        return customer;
    }

    public async deleteByIds(ids: string[]): Promise<void> {
        await this.ormRepository.delete(ids);
    }
}

export default CustomerRepository;
