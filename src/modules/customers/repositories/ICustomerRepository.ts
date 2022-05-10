import Customer from '../infra/typeorm/entities/customer';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomerRespository {
    // findById(id: string): Promise<Customer | undefined>;
    findByEmail(email: string): Promise<Customer | undefined>;
    create(data: ICreateCustomerDTO): Promise<Customer>;
    save(user: Customer): Promise<Customer>;
    deleteByIds(ids: string[]): Promise<void>;
}
